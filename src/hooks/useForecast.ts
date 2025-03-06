import { useQuery } from '@tanstack/react-query'
import { weatherService } from '@/api/weatherService'
import { GeoLocation } from '@/api/weatherService'
import { ForecastItem, ForecastResponse } from '@/stores/types/weather.types'
import { hourlyGetTime } from '@/lib/utils'

export interface TransformedForecast {
  daily: DailyForecast[]
  hourly: HourlyForecast[]
}

export interface DailyForecast {
  dt: number
  temp: number
  icon: string
  date: Date
}

interface HourlyForecast {
  dt: number
  temp: number
  icon: string
  time: string
}

export const useForecast = (location: GeoLocation | null) => {
  return useQuery<ForecastResponse, Error, TransformedForecast>({
    queryKey: ['forecast', location?.lat, location?.lon],
    queryFn: () => {
      if (!location) throw new Error('No location selected')
      return weatherService.getForecast(location.lat, location.lon)
    },
    enabled: !!location,
    staleTime: 1000 * 60 * 60 * 2, // 2 horas de cache
    select: data => transformForecastData(data)
  })
}

// Función para transformar los datos crudos
const transformForecastData = (data: ForecastResponse): TransformedForecast => {
  const dailyData: { [key: string]: ForecastItem[] } = {}

  data.list.forEach(item => {
    const date = new Date(item.dt * 1000)
    date.setHours(date.getHours() + date.getTimezoneOffset() / 60)
    const dateKey = date.toISOString().split('T')[0]

    if (!dailyData[dateKey]) {
      dailyData[dateKey] = []
    }
    dailyData[dateKey].push(item)
  })

  const daily = Object.keys(dailyData)
    .slice(0, 5)
    .map(date => {
      const items = dailyData[date]
      const firstItem = items[0]
      const dayDate = new Date(date)

      return {
        dt: firstItem.dt,
        temp: Math.round(Math.max(...items.map(item => item.main.temp))),
        icon: items[Math.floor(items.length / 2)].weather[0].icon,
        date: dayDate
      }
    })

  const hourly = data.list.slice(0, 8).map(item => ({
    dt: item.dt,
    temp: Math.round(item.main.temp),
    icon: item.weather[0].icon,
    time: hourlyGetTime(item.dt, data.city.timezone)
  }))

  return { hourly, daily }
}
