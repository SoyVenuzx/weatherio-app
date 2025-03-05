import { Cloud, MapPin, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const Header = () => {
  return (
    <>
      {/* Header */}
      <header className='flex items-center justify-between pb-6 mb-12 border-b'>
        <div className='flex items-center gap-2'>
          <Cloud className='w-6 h-6' />
          <h1 className='text-xl font-medium'>weatherio</h1>
        </div>

        <div className='relative flex-1 max-w-md mx-8'>
          <Search className='absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2' />
          <Input
            className='w-full pl-10 border-gray-200 rounded-md focus:ring-black focus:border-black'
            placeholder='Search location...'
            defaultValue='washington'
          />
        </div>

        <Button
          variant='outline'
          className='flex items-center gap-2 border-gray-200 rounded-md hover:bg-gray-50'
        >
          <MapPin className='w-4 h-4' />
          Current Location
        </Button>
      </header>
    </>
  )
}
