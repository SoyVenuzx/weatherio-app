import { useState } from 'react'
import { Search, MapPin, Cloud, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useGeoSearch } from '@/hooks/useGeoSearch'
import { GeoLocation } from '@/api/weatherService'
import { useGeolocation } from '@/hooks/useGeoLocation'
import { useWeatherStore } from '@/hooks/useWeatherStore'
import { sleep } from '@/lib/utils'

interface HeaderProps {
  onLocationSelect: (location: GeoLocation) => void
  onError: (message: string) => void
}

export const Header = ({ onLocationSelect, onError }: HeaderProps) => {
  const [query, setQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { data: suggestions, isLoading, isError } = useGeoSearch(query)
  const { setLoading } = useWeatherStore()

  const { getCurrentLocation, isLoading: isGeoLoading } = useGeolocation()

  const handleSelect = (location: GeoLocation) => {
    onLocationSelect(location)
    setQuery('')
    setIsSearchFocused(false)
  }

  const handleCurrentLocation = async () => {
    if (isLoading) {
      setLoading(true)
    }

    const location = await getCurrentLocation()
    await sleep(500)

    if (location) {
      onLocationSelect(location)
      setLoading(false)
    } else {
      onError('Could not get your current location')
    }
  }

  return (
    <header className='relative flex items-center justify-between pb-6 mb-12 border-b'>
      {/* Logo */}
      <div className='flex items-center gap-2'>
        <Cloud className='w-6 h-6' />
        <h1 className='text-xl font-medium'>weatherio</h1>
      </div>

      {/* Búsqueda con sugerencias */}
      <div className='relative flex-1 max-w-md mx-8'>
        <div className='relative'>
          <Search className='absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2' />
          <Input
            className='w-full pl-10 border-gray-200 rounded-md focus:ring-black focus:border-black'
            placeholder='Search location...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />
          {query && (
            <X
              className='absolute w-4 h-4 transform -translate-y-1/2 cursor-pointer right-3 top-1/2'
              onClick={() => setQuery('')}
            />
          )}
        </div>

        {/* Lista de sugerencias */}
        {isSearchFocused && (
          <div className='absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg'>
            {isLoading && (
              <div className='p-4 text-sm text-gray-500'>Searching...</div>
            )}

            {isError && (
              <div className='p-4 text-sm text-red-500'>
                Error fetching locations
              </div>
            )}

            {suggestions?.map(location => (
              <div
                key={`${location.lat}-${location.lon}`}
                className='flex items-center p-3 cursor-pointer hover:bg-gray-50'
                onMouseDown={() => handleSelect(location)}
              >
                <MapPin className='w-4 h-4 mr-2' />
                <span>
                  {location.name}
                  {location.state && `, ${location.state}`}, {location.country}
                </span>
              </div>
            ))}

            {!isLoading && !isError && suggestions?.length === 0 && (
              <div className='p-4 text-sm text-gray-500'>
                No locations found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botón de ubicación actual */}
      <Button
        variant='outline'
        className='flex items-center gap-2 border-gray-200 rounded-md hover:bg-gray-50'
        onClick={handleCurrentLocation}
        disabled={isGeoLoading}
      >
        <MapPin className='w-4 h-4' />
        {isGeoLoading ? 'Detecting...' : 'Current Location'}
      </Button>
    </header>
  )
}
