import { GeoLocation } from '@/api/weatherService'
import { WeatherData } from '../../api/types/weather'

export type WeatherStoreType = {
  weatherData: WeatherData | null
  locationSelected: GeoLocation | null
  query: string
  isLoading: boolean
  hasError: boolean
  setWeatherData: (data: WeatherData) => void
  setLoading: (value: boolean) => void
  setError: (value: boolean) => void
  setQuery: (query: string) => void
  setLocation: (location: GeoLocation) => void
}

export interface ForecastResponse {
  list: ForecastItem[]
  city: {
    timezone: number
  }
}

export interface ForecastItem {
  dt: number
  main: {
    temp: number
  }
  weather: {
    icon: string
  }[]
}
