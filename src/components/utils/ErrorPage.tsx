import type React from 'react'
import { Cloud, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorPageProps {
  message?: string
  onRetry?: () => void
  onHome?: () => void
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  message = 'No pudimos encontrar la información del clima que estás buscando.',
  onRetry,
  onHome
}) => {
  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center p-6 text-center'>
      <div className='relative mb-6'>
        <Cloud className='w-24 h-24 text-gray-300' />
        <div className='absolute top-0 right-0 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full'>
          <span className='font-medium text-gray-500'>?</span>
        </div>
      </div>

      <h1 className='mb-2 text-3xl font-medium'>Información no encontrada</h1>
      <p className='max-w-md mb-8 text-gray-500'>{message}</p>

      <div className='flex flex-col gap-4 sm:flex-row'>
        {onRetry && (
          <Button
            variant='outline'
            className='flex items-center gap-2 border-gray-200'
            onClick={onRetry}
          >
            <RefreshCw className='w-4 h-4' />
            Intentar nuevamente
          </Button>
        )}

        {onHome && (
          <Button
            className='flex items-center gap-2 text-white bg-black hover:bg-gray-800'
            onClick={onHome}
          >
            <Home className='w-4 h-4' />
            Volver al inicio
          </Button>
        )}
      </div>
    </div>
  )
}

export default ErrorPage
