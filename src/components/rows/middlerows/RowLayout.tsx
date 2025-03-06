import { GeoLocation } from '@/api/weatherService'
import { useWeather } from '@/components/utils/useWeather'
import { useAirQuality } from '@/hooks/useAIrQuality'
import { getTime } from '@/lib/utils'
import { Droplets, Eye, Moon, Sun, Thermometer, Wind } from 'lucide-react'

interface RowLayoutProps {
  location: GeoLocation | null
}

export const RowLayout = ({ location }: RowLayoutProps) => {
  const { data: airQuality } = useAirQuality(location)
  const { data: currentWeather } = useWeather(location)

  if (!currentWeather) return null

  return (
    <div className='p-6 border border-gray-200 rounded-lg'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg font-medium text-gray-700'>
          Today's Highlights
        </h2>
        {location && (
          <span className='px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full'>
            {location.name}, {location.country}
          </span>
        )}
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {/* Air Quality Card */}
        {airQuality && (
          <div className='p-4 border border-gray-100 rounded-lg'>
            <h3 className='mb-4 text-sm text-gray-500'>Air Quality Index</h3>
            <div className='flex items-center justify-between mb-2'>
              <Wind className='w-5 h-5 text-gray-700' />
              <span className='bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs'>
                {airQuality.level}
              </span>
            </div>
            <div className='grid grid-cols-2 gap-2 mt-4'>
              <div>
                <p className='text-xs text-gray-500'>PM2.5</p>
                <p className='text-lg'>
                  {airQuality.components.pm2_5.toFixed(1)}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>SO2</p>
                <p className='text-lg'>
                  {airQuality.components.so2.toFixed(1)}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>NO2</p>
                <p className='text-lg'>
                  {airQuality.components.no2.toFixed(1)}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>O3</p>
                <p className='text-lg'>{airQuality.components.o3.toFixed(1)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Sunrise & Sunset Card */}
        <div className='p-4 border border-gray-100 rounded-lg'>
          <h3 className='mb-4 text-sm text-gray-500'>Sunrise & Sunset</h3>
          <div className='flex items-center gap-2 mb-4'>
            <Sun className='w-5 h-5 text-gray-700' />
            <div>
              <p className='text-xs text-gray-500'>Sunrise</p>
              <p className='text-lg'>
                {getTime(currentWeather.sys.sunrise, currentWeather.timezone)}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Moon className='w-5 h-5 text-gray-700' />
            <div>
              <p className='text-xs text-gray-500'>Sunset</p>
              <p className='text-lg'>
                {getTime(currentWeather.sys.sunset, currentWeather.timezone)}
              </p>
            </div>
          </div>
        </div>

        {/* Humidity Card */}
        <div className='p-4 border border-gray-100 rounded-lg'>
          <h3 className='mb-4 text-sm text-gray-500'>Humidity</h3>
          <div className='flex items-center gap-2 mb-2'>
            <Droplets className='w-5 h-5 text-gray-700' />
            <p className='text-2xl'>
              {currentWeather.main.humidity}
              <span className='text-lg'>%</span>
            </p>
          </div>
          <div className='mt-4'>
            <div className='w-full bg-gray-100 rounded-full h-1.5'>
              <div
                className='bg-gray-700 h-1.5 rounded-full'
                style={{ width: `${currentWeather.main.humidity}%` }}
              ></div>
            </div>
            <div className='flex justify-between mt-1 text-xs text-gray-500'>
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* Pressure Card */}
        <div className='p-4 border border-gray-100 rounded-lg'>
          <h3 className='mb-4 text-sm text-gray-500'>Pressure</h3>
          <div className='flex items-center gap-2'>
            <Wind className='w-5 h-5 text-gray-700' />
            <p className='text-2xl'>
              {currentWeather.main.pressure}
              <span className='ml-1 text-sm'>hPa</span>
            </p>
          </div>
          <p className='mt-4 text-xs text-gray-500'>
            Normal atmospheric pressure
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 mt-6 md:grid-cols-2'>
        {/* Visibility Card */}
        <div className='p-4 border border-gray-100 rounded-lg'>
          <h3 className='mb-4 text-sm text-gray-500'>Visibility</h3>
          <div className='flex items-center gap-2'>
            <Eye className='w-5 h-5 text-gray-700' />
            <p className='text-2xl'>
              {(currentWeather.visibility / 1000).toFixed(1)}
              <span className='ml-1 text-sm'>km</span>
            </p>
          </div>
          <p className='mt-4 text-xs text-gray-500'>Clear visibility</p>
        </div>

        {/* Feels Like Card */}
        <div className='p-4 border border-gray-100 rounded-lg'>
          <h3 className='mb-4 text-sm text-gray-500'>Feels Like</h3>
          <div className='flex items-center gap-2'>
            <Thermometer className='w-5 h-5 text-gray-700' />
            <p className='text-2xl'>
              {Math.round(currentWeather.main.feels_like)}
              <span className='ml-1 text-sm'>°C</span>
            </p>
          </div>
          <p className='mt-4 text-xs text-gray-500'>
            {currentWeather.main.feels_like > currentWeather.main.temp
              ? 'Warmer than actual temperature'
              : 'Colder than actual temperature'}
          </p>
        </div>
      </div>
    </div>
  )
}
