import { useForecast } from '@/hooks/useForecast'
import { GeoLocation } from '@/api/weatherService'
import { getWeatherIcon } from '../columns/DaysForecast'

interface HourForecastProps {
  location: GeoLocation | null
}

export const HourForecast = ({ location }: HourForecastProps) => {
  const { data: forecast } = useForecast(location)

  if (!forecast?.hourly) return null

  return (
    <div className='p-6 border border-gray-200 rounded-lg'>
      <h2 className='mb-6 text-lg font-medium text-gray-700'>Today at</h2>
      <div className='grid grid-cols-4 gap-4 md:grid-cols-8'>
        {forecast.hourly.map((hour, index) => (
          <div
            key={index}
            className='p-3 text-center border border-gray-100 rounded-lg '
          >
            <p className='mb-2 text-sm text-gray-500 '>{hour.time}</p>
            {getWeatherIcon(hour.icon)}
            <p className='mt-2 text-sm font-medium'>{`${hour.temp}°`}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
