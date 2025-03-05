import { Cloud, CloudSun, Moon, Sun } from 'lucide-react'
import React from 'react'

export const HourForecast = () => {
  return (
    <div className='p-6 border border-gray-200 rounded-lg'>
      <h2 className='mb-6 text-lg font-medium text-gray-700'>Today at</h2>
      <div className='grid grid-cols-4 gap-4 md:grid-cols-8'>
        {[
          {
            time: '9 PM',
            icon: <Cloud className='w-6 h-6 text-gray-700' />,
            temp: '4°'
          },
          {
            time: '12 AM',
            icon: <Cloud className='w-6 h-6 text-gray-700' />,
            temp: '3°'
          },
          {
            time: '3 AM',
            icon: <Cloud className='w-6 h-6 text-gray-700' />,
            temp: '3°'
          },
          {
            time: '6 AM',
            icon: <Moon className='w-6 h-6 text-gray-700' />,
            temp: '2°'
          },
          {
            time: '9 AM',
            icon: <Sun className='w-6 h-6 text-gray-700' />,
            temp: '4°'
          },
          {
            time: '12 PM',
            icon: <Sun className='w-6 h-6 text-gray-700' />,
            temp: '5°'
          },
          {
            time: '3 PM',
            icon: <CloudSun className='w-6 h-6 text-gray-700' />,
            temp: '5°'
          },
          {
            time: '6 PM',
            icon: <Moon className='w-6 h-6 text-gray-700' />,
            temp: '4°'
          }
        ].map((item, index) => (
          <div
            key={index}
            className='p-3 text-center border border-gray-100 rounded-lg'
          >
            <p className='mb-2 text-sm text-gray-500'>{item.time}</p>
            {item.icon}
            <p className='mt-2 text-sm font-medium'>{item.temp}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
