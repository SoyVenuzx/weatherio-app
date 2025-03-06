import { useState } from 'react'
import { GeoLocation, weatherService } from '@/api/weatherService'

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

      return location
    } catch (err) {
      const error = err as GeolocationPositionError
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError('Permission to access location was denied')
          break
        case error.POSITION_UNAVAILABLE:
          setError('Location information is unavailable')
          break
        case error.TIMEOUT:
          setError('The request to get location timed out')
          break
        default:
          setError('Unknown error occurred')
      }
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { getCurrentLocation, isLoading, error }
}
