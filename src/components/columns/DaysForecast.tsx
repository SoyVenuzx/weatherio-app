import { Cloud, CloudRain, Moon, Sun, CloudSun } from 'lucide-react'
import { weekDayNames, monthNames } from '@/lib/utils'

import { JSX } from 'react'
import { TransformedForecast } from '@/hooks/useForecast'

interface DaysForecastProps {
  forecast?: TransformedForecast[]
}

export const DaysForecast = ({ forecast }: DaysForecastProps) => {
  if (!forecast) return null

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      '01d': <Sun className='w-5 h-5 text-yellow-500' />,
      '01n': <Moon className='w-5 h-5 text-gray-700' />,
      '02d': <CloudSun className='w-5 h-5 text-yellow-500' />,
      '02n': <Cloud className='w-5 h-5 text-gray-700' />,
      '03d': <Cloud className='w-5 h-5 text-gray-500' />,
      '03n': <Cloud className='w-5 h-5 text-gray-500' />,
      '04d': <Cloud className='w-5 h-5 text-gray-700' />,
      '04n': <Cloud className='w-5 h-5 text-gray-700' />,
      '09d': <CloudRain className='w-5 h-5 text-blue-500' />,
      '09n': <CloudRain className='w-5 h-5 text-blue-500' />,
      '10d': <CloudRain className='w-5 h-5 text-blue-500' />,
      '10n': <CloudRain className='w-5 h-5 text-blue-500' />,
      '11d': <CloudRain className='w-5 h-5 text-blue-500' />,
      '11n': <CloudRain className='w-5 h-5 text-blue-500' />,
      '13d': <Cloud className='w-5 h-5 text-gray-500' />,
      '13n': <Cloud className='w-5 h-5 text-gray-500' />,
      '50d': <Cloud className='w-5 h-5 text-gray-500' />,
      '50n': <Cloud className='w-5 h-5 text-gray-500' />
    }

    return iconMap[iconCode] || <Cloud className='w-5 h-5 text-gray-500' />
  }

  const formatDate = (date: Date) => {
    const dayName = weekDayNames[date.getDay()]
    const month = monthNames[date.getMonth()]
    const day = date.getDate()
    return { dayName, dateStr: `${day} ${month}` }
  }

  return (
    <div className='p-6 border border-gray-200 rounded-lg'>
      <h2 className='mb-6 text-lg font-medium text-gray-700'>
        5 Days Forecast
      </h2>
      <div className='space-y-6'>
        {forecast.map((day, index) => {
          const { dayName, dateStr } = formatDate(day.date)

          return (
            <div key={index} className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                {getWeatherIcon(day.icon)}
                <span className='text-lg'>{day.temp}°</span>
              </div>
              <div className='text-sm text-gray-500'>
                <span className='mr-3'>{dateStr}</span>
                <span>{dayName}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
