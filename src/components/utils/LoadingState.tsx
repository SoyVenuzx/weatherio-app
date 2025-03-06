import type React from 'react'
import { Cloud } from 'lucide-react'

interface LoadingStateProps {
  message?: string
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Obteniendo datos del clima...'
}) => {
  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center p-6'>
      <div className='relative mb-6'>
        <Cloud className='w-16 h-16 text-gray-300 animate-pulse' />
        <div className='absolute -bottom-2 -right-2'>
          <div className='flex space-x-1'>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <p className='font-medium text-gray-500'>{message}</p>

      <div className='grid grid-cols-3 gap-3 mt-8'>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className='w-full h-24 bg-gray-100 rounded-lg animate-pulse'
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1.5s'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default LoadingState
