import React from 'react'
import {
  Calendar,
  MapPin,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
  Sun,
  CloudSun,
  Moon,
  CloudMoon,
  Thermometer
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { WeatherData } from '@/api/types/weather'

interface CurrentWeatherProps {
  weatherData: WeatherData
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weatherData
}) => {
  // Función para obtener el icono adecuado según el código de clima y la hora del día
  const getWeatherIcon = () => {
    if (!weatherData.weather || weatherData.weather.length === 0) {
      return <Cloud className='w-20 h-20 mb-4 text-gray-700' />
    }

    const weatherCode = weatherData.weather[0].id
    const iconCode = weatherData.weather[0].icon
    const isDay = iconCode.includes('d')

    // Determinar si es de día o de noche según el código de icono de la API
    if (weatherCode >= 200 && weatherCode < 300) {
      // Tormenta
      return <CloudLightning className='w-20 h-20 mb-4 text-gray-700' />
    } else if (weatherCode >= 300 && weatherCode < 600) {
      // Lluvia
      return <CloudRain className='w-20 h-20 mb-4 text-gray-700' />
    } else if (weatherCode >= 600 && weatherCode < 700) {
      // Nieve
      return <CloudSnow className='w-20 h-20 mb-4 text-gray-700' />
    } else if (weatherCode >= 700 && weatherCode < 800) {
      // Niebla
      return <CloudFog className='w-20 h-20 mb-4 text-gray-700' />
    } else if (weatherCode === 800) {
      // Cielo despejado
      return isDay ? (
        <Sun className='w-20 h-20 mb-4 text-gray-700' />
      ) : (
        <Moon className='w-20 h-20 mb-4 text-gray-700' />
      )
    } else if (weatherCode === 801 || weatherCode === 802) {
      // Pocas nubes
      return isDay ? (
        <CloudSun className='w-20 h-20 mb-4 text-gray-700' />
      ) : (
        <CloudMoon className='w-20 h-20 mb-4 text-gray-700' />
      )
    } else {
      // Nublado
      return <Cloud className='w-20 h-20 mb-4 text-gray-700' />
    }
  }

  // Formatear la temperatura a entero
  const formatTemperature = (temp: number) => {
    return Math.round(temp)
  }

  // Obtener la fecha actual en formato local
  const getCurrentDate = () => {
    const date = new Date()
    return format(date, 'EEEE d, MMM', { locale: es })
  }

  // Capitalizar primera letra de cada palabra
  const capitalizeFirstLetter = (string: string) => {
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className='p-6 border border-gray-200 rounded-lg'>
      <h2 className='mb-6 text-lg font-medium text-gray-700'>Ahora</h2>
      <div className='flex flex-col items-center'>
        {getWeatherIcon()}
        <div className='text-center'>
          <div className='flex items-end justify-center'>
            <span className='text-6xl font-light'>
              {formatTemperature(weatherData.main?.temp)}
            </span>
            <span className='ml-1 text-2xl'>°C</span>
          </div>
          <p className='mt-2 text-gray-500'>
            {weatherData.weather && weatherData.weather.length > 0
              ? capitalizeFirstLetter(weatherData.weather[0]?.description)
              : 'Sin datos'}
          </p>
        </div>
      </div>
      <div className='pt-4 mt-6 border-t border-gray-100'>
        <div className='flex items-center gap-2 mb-2 text-gray-500'>
          <Calendar className='w-4 h-4' />
          <span className='text-sm'>{getCurrentDate()}</span>
        </div>
        <div className='flex items-center gap-2 text-gray-500'>
          <MapPin className='w-4 h-4' />
          <span className='text-sm'>
            {weatherData.name}, {weatherData.sys?.country}
          </span>
        </div>
        <div className='flex items-center gap-2 mt-2 text-gray-500'>
          <Thermometer className='w-4 h-4' />
          <span className='text-sm'>
            Sensación térmica: {formatTemperature(weatherData.main?.feels_like)}
            °C
          </span>
        </div>
      </div>
    </div>
  )
}
