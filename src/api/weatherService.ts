import { ForecastResponse } from '@/stores/types/weather.types'
import axios from 'axios'

// Configuración base
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL
const GEO_URL = 'http://api.openweathermap.org/geo/1.0'
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

// Instancias separadas para diferentes endpoints
const geoApi = axios.create({
  baseURL: GEO_URL,
  params: {
    appid: API_KEY,
    limit: 5
  }
})

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'en'
  }
})

// Tipos TypeScript
export interface GeoLocation {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

export interface AirQualityResponse {
  list: {
    main: {
      aqi: 1 | 2 | 3 | 4 | 5
    }
    components: {
      pm2_5: number
      so2: number
      no2: number
      o3: number
    }
    dt: number
  }[]
}

// Funciones de servicio
export const weatherService = {
  searchLocations: async (query: string): Promise<GeoLocation[]> => {
    const response = await geoApi.get('/direct', { params: { q: query } })
    return response.data
  },

  getCurrentWeather: async (lat: number, lon: number) => {
    const response = await weatherApi.get('/weather', { params: { lat, lon } })
    return response.data
  },

  getForecast: async (lat: number, lon: number): Promise<ForecastResponse> => {
    const response = await weatherApi.get('/forecast', { params: { lat, lon } })
    return response.data
  },
  getReverseGeo: async (lat: number, lon: number): Promise<GeoLocation> => {
    const response = await geoApi.get('/reverse', { params: { lat, lon } })
    return response.data[0] // Devuelve el primer resultado
  },

  getCurrentWeatherByCoords: async (lat: number, lon: number) => {
    const response = await weatherApi.get('/weather', { params: { lat, lon } })
    return response.data
  },
  getAirQuality: async (
    lat: number,
    lon: number
  ): Promise<AirQualityResponse> => {
    const response = await weatherApi.get('/air_pollution', {
      params: { lat, lon }
    })
    return response.data
  }
}
