import { useQuery } from '@tanstack/react-query'
import { weatherService, AirQualityResponse } from '@/api/weatherService'
import { GeoLocation } from '@/api/weatherService'
import { aqiText } from '@/lib/utils'

export const useAirQuality = (location: GeoLocation | null) => {
  return useQuery({
    queryKey: ['airQuality', location?.lat, location?.lon],
    queryFn: () => {
      if (!location) throw new Error('No location selected')
      return weatherService.getAirQuality(location.lat, location.lon)
    },
    enabled: !!location,
    select: data => ({
      aqi: data.list[0].main.aqi,
      level: aqiText[data.list[0].main.aqi].level,
      components: data.list[0].components
    }),
    staleTime: 1000 * 60 * 60 // 1 hora de cache
  })
}
