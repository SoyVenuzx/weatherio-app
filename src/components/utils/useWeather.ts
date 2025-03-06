import { WeatherData } from '@/api/types/weather'
import { GeoLocation, weatherService } from '@/api/weatherService'
import { useQuery } from '@tanstack/react-query'

export const useWeather = (location: GeoLocation | null) => {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', location?.lat, location?.lon],
    queryFn: () => {
      if (!location) throw new Error('No location selected')
      return weatherService.getCurrentWeatherByCoords(
        location.lat,
        location.lon
      )
    },
    enabled: !!location,
    retry: 1,
    staleTime: 1000 * 60 * 5
  })
}
