import { useState } from 'react'
import { GeoLocation, weatherService } from '@/api/weatherService'
import { useGeoSearch } from './useGeoSearch'

export const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrentLocation = async (): Promise<GeoLocation | null> => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000
          })
        }
      )

      const location = await weatherService.getReverseGeo(
        position.coords.latitude,
        position.coords.longitude
      )

      console.log({ location })

      return location
    } catch (err) {
      const error = err as GeolocationPositionError
      console.log({ error })

      return null
    } finally {
      setIsLoading(false)
    }
  }

  const getDefaultLocation = () => {
    const { data } = useGeoSearch('London')

    if (!data) return null

    return data[0]
  }

  return { getDefaultLocation, getCurrentLocation, isLoading, error }
}
