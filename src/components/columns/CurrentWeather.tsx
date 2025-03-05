import { Calendar, Cloud, MapPin } from 'lucide-react'

export const CurrentWeather = () => {
  return (
    <>
      <div className='p-6 border border-gray-200 rounded-lg'>
        <h2 className='mb-6 text-lg font-medium text-gray-700'>Now</h2>
        <div className='flex flex-col items-center'>
          <Cloud className='w-20 h-20 mb-4 text-gray-700' />
          <div className='text-center'>
            <div className='flex items-end justify-center'>
              <span className='text-6xl font-light'>5</span>
              <span className='ml-1 text-2xl'>°C</span>
            </div>
            <p className='mt-2 text-gray-500'>Broken Clouds</p>
          </div>
        </div>
        <div className='pt-4 mt-6 border-t border-gray-100'>
          <div className='flex items-center gap-2 mb-2 text-gray-500'>
            <Calendar className='w-4 h-4' />
            <span className='text-sm'>Wednesday 1, Mar</span>
          </div>
          <div className='flex items-center gap-2 text-gray-500'>
            <MapPin className='w-4 h-4' />
            <span className='text-sm'>London, GB</span>
          </div>
        </div>
      </div>
    </>
  )
}
