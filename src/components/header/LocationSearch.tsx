'use client'

import type React from 'react'
import { MapPin } from 'lucide-react'

export interface Location {
  name: string
  country: string
  state?: string
}

interface LocationSearchProps {
  locations: Location[]
  isLoading: boolean
  onSelectLocation: (location: Location) => void
  searchTerm: string
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  locations,
  isLoading,
  onSelectLocation,
  searchTerm
}) => {
  if (!searchTerm) return null

  return (
    <div className='absolute left-0 right-0 z-50 mt-1 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg top-full'>
      {isLoading ? (
        <div className='p-4'>
          <div className='space-y-3'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='flex items-center gap-3 animate-pulse'>
                <div className='w-4 h-4 bg-gray-200 rounded-full' />
                <div className='flex-1'>
                  <div className='w-1/2 h-4 mb-2 bg-gray-200 rounded' />
                  <div className='w-1/3 h-3 bg-gray-100 rounded' />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : locations.length === 0 ? (
        <div className='p-4 text-center text-gray-500'>
          No se encontraron ubicaciones para "{searchTerm}"
        </div>
      ) : (
        <div className='max-h-[300px] overflow-y-auto'>
          {locations.map((location, index) => (
            <button
              key={`${location.name}-${location.country}-${index}`}
              className='flex items-start w-full gap-3 px-4 py-3 text-left transition-colors border-b border-gray-100 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none last:border-0'
              onClick={() => onSelectLocation(location)}
            >
              <MapPin className='w-4 h-4 mt-1 text-gray-400' />
              <div>
                <div className='font-medium text-gray-900'>{location.name}</div>
                <div className='text-sm text-gray-500'>
                  {location.state ? `${location.state}, ` : ''}
                  {location.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationSearch
