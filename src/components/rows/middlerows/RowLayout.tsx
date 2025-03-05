import { Droplets, Eye, Moon, Sun, Thermometer, Wind } from 'lucide-react'

export const RowLayout = () => {
  return (
    <>
      {/* Air Quality */}
      <div className='p-6 border border-gray-200 rounded-lg'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-lg font-medium text-gray-700'>
            Today's Highlights
          </h2>
          <span className='px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full'>
            London, GB
          </span>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {/* Air Quality Card */}
          <div className='p-4 border border-gray-100 rounded-lg'>
            <h3 className='mb-4 text-sm text-gray-500'>Air Quality Index</h3>
            <div className='flex items-center justify-between mb-2'>
              <Wind className='w-5 h-5 text-gray-700' />
              <span className='bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs'>
                Good
              </span>
            </div>
            <div className='grid grid-cols-2 gap-2 mt-4'>
              <div>
                <p className='text-xs text-gray-500'>PM2.5</p>
                <p className='text-lg'>3.90</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>SO2</p>
                <p className='text-lg'>7.75</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>NO2</p>
                <p className='text-lg'>33.6</p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>O3</p>
                <p className='text-lg'>38.6</p>
              </div>
            </div>
          </div>

          {/* Sunrise & Sunset Card */}
          <div className='p-4 border border-gray-100 rounded-lg'>
            <h3 className='mb-4 text-sm text-gray-500'>Sunrise & Sunset</h3>
            <div className='flex items-center gap-2 mb-4'>
              <Sun className='w-5 h-5 text-gray-700' />
              <div>
                <p className='text-xs text-gray-500'>Sunrise</p>
                <p className='text-lg'>6:46 AM</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Moon className='w-5 h-5 text-gray-700' />
              <div>
                <p className='text-xs text-gray-500'>Sunset</p>
                <p className='text-lg'>5:39 PM</p>
              </div>
            </div>
          </div>

          {/* Humidity Card */}
          <div className='p-4 border border-gray-100 rounded-lg'>
            <h3 className='mb-4 text-sm text-gray-500'>Humidity</h3>
            <div className='flex items-center gap-2 mb-2'>
              <Droplets className='w-5 h-5 text-gray-700' />
              <p className='text-2xl'>
                82<span className='text-lg'>%</span>
              </p>
            </div>
            <div className='mt-4'>
              <div className='w-full bg-gray-100 rounded-full h-1.5'>
                <div
                  className='bg-gray-700 h-1.5 rounded-full'
                  style={{ width: '82%' }}
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
                1025<span className='ml-1 text-sm'>hPa</span>
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
                10<span className='ml-1 text-sm'>km</span>
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
                2<span className='ml-1 text-sm'>°C</span>
              </p>
            </div>
            <p className='mt-4 text-xs text-gray-500'>
              Colder than actual temperature
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
