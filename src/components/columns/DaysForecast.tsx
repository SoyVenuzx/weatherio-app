import { Cloud, CloudRain, Moon } from 'lucide-react'
import React from 'react'

export const DaysForecast = () => {
  return (
    <div className='p-6 border border-gray-200 rounded-lg'>
      <h2 className='mb-6 text-lg font-medium text-gray-700'>
        5 Days Forecast
      </h2>
      <div className='space-y-6'>
        {[
          {
            day: 'Thursday',
            date: '2 Mar',
            temp: '7°',
            icon: <Moon className='w-5 h-5 text-gray-700' />
          },
          {
            day: 'Friday',
            date: '3 Mar',
            temp: '7°',
            icon: <Moon className='w-5 h-5 text-gray-700' />
          },
          {
            day: 'Saturday',
            date: '4 Mar',
            temp: '7°',
            icon: <Cloud className='w-5 h-5 text-gray-700' />
          },
          {
            day: 'Sunday',
            date: '5 Mar',
            temp: '6°',
            icon: <CloudRain className='w-5 h-5 text-gray-700' />
          }
        ].map((item, index) => (
          <div key={index} className='flex items-center justify-between py-1'>
            <div className='flex items-center gap-3'>
              {item.icon}
              <span className='text-lg'>{item.temp}</span>
            </div>
            <div className='text-sm text-gray-500'>
              <span className='mr-3'>{item.date}</span>
              <span>{item.day}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
