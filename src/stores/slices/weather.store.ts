import { create } from 'zustand'
import { WeatherStoreType } from '../types/weather.types'
import { devtools, persist } from 'zustand/middleware'

export const WeatherStore = create<WeatherStoreType>()(
  devtools(
    persist(
      set => ({
        weatherData: null,
        query: '',
        isLoading: false,
        hasError: false,
        locationSelected: null,

        setWeatherData: data => {
          set(() => ({
            weatherData: data
          }))
        },
        setLoading: value => {
          set(() => ({
            isLoading: value
          }))
        },
        setError: value => {
          set(() => ({
            hasError: value
          }))
        },
        setQuery: query => {
          set(() => ({
            query: query
          }))
        },
        setLocation: location => {
          set(() => ({
            locationSelected: location
          }))
        }
      }),
      {
        name: 'weather-state',
        partialize: state => ({ state: state.locationSelected })
      }
    )
  )
)
