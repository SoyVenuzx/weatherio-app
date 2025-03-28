import { Header } from './header/Header'
import { CurrentWeather } from './columns/CurrentWeather'
import { DaysForecast } from './columns/DaysForecast'
import { RowLayout } from './rows/middlerows/RowLayout'
import { HourForecast } from './rows/HourForecast'
import { Footer } from './footer/Footer'
import ErrorPage from './utils/ErrorPage'
import LoadingState from './utils/LoadingState'
import { useWeatherStore } from '@/hooks/useWeatherStore'
import { useEffect, useState } from 'react'
import { GeoLocation } from '@/api/weatherService'
import { useWeather } from './utils/useWeather'
import { useGeolocation } from '@/hooks/useGeoLocation'
import { sleep } from '@/lib/utils'
import { WeatherData } from '@/api/types/weather'
import { useForecast } from '@/hooks/useForecast'

export const Layout = () => {
  const {
    locationSelected,
    setLocation,
    isLoading,
    setLoading,
    hasError,
    setError
  } = useWeatherStore()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { getDefaultLocation } = useGeolocation()

  const test = getDefaultLocation()

  useEffect(() => {
    // const updateLocation = async () => {
    //   if (!locationSelected) {
    //     setLoading(true)
    //     const currentLocation = await getCurrentLocation()

    //     if (currentLocation) {
    //       await sleep(1500)
    //       setLocation(currentLocation)
    //       setLoading(false)
    //     } else {
    //       return
    //     }
    //   }
    // }

    const setDefaultLocation = async () => {
      if (!locationSelected) {
        setLoading(true)

        if (test) {
          await sleep(2000)
          setLocation(test)
          setLoading(false)
        } else {
          console.error('Failed to load defaultLocation data')
        }
      }
    }

    setDefaultLocation().catch(console.error)
    // updateLocation().catch(console.error)
  }, [test])

  const { data: forecastData } = useForecast(locationSelected)
  const { data: currentWeather } = useWeather(locationSelected)

  const handleLocationSelect = (location: GeoLocation) => {
    setLocation(location)
    setErrorMessage(null)
  }

  const handleRetry = () => {
    setLoading(true)
    setError(false)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  if (isLoading) return <LoadingState />

  if (hasError) {
    return (
      <ErrorPage
        message='No pudimos obetener los datos del clima para esta ubicación. Por favor, intenta nuevamente'
        onRetry={handleRetry}
        onHome={() => setError(false)}
      />
    )
  }

  return (
    <div className='min-h-screen p-6 mx-auto text-black bg-white max-w-7xl'>
      {/* Header */}
      <Header
        onLocationSelect={handleLocationSelect}
        onError={setErrorMessage}
      />

      {errorMessage && (
        <div className='p-4 text-red-500 bg-red-50'>{errorMessage}</div>
      )}

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
        {/* Left Column - Current Weather */}
        <div className='space-y-8 lg:col-span-3'>
          <CurrentWeather weatherData={currentWeather ?? ({} as WeatherData)} />
          {/* 5 Days Forecast */}
          <DaysForecast forecast={forecastData} />
        </div>

        {/* Middle and Right Columns - Today's Highlights */}
        <div className='space-y-8 lg:col-span-9'>
          <RowLayout location={locationSelected} />
          {/* Hourly Forecast */}
          <HourForecast location={locationSelected} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
