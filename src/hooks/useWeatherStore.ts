import { WeatherStore } from '@/stores/slices/weather.store'

export const useWeatherStore = () => {
  const weatherData = WeatherStore(state => state.weatherData)
  const isLoading = WeatherStore(state => state.isLoading)
  const setLoading = WeatherStore(state => state.setLoading)
  const hasError = WeatherStore(state => state.hasError)
  const setError = WeatherStore(state => state.setError)
  const locationSelected = WeatherStore(state => state.locationSelected)
  const setLocation = WeatherStore(state => state.setLocation)

  return {
    weatherData,
    isLoading,
    hasError,
    setLoading,
    setError,
    locationSelected,
    setLocation
  }
}
