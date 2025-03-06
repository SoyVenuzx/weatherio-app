import { useQuery } from '@tanstack/react-query'
import { GeoLocation, weatherService } from '@/api/weatherService'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

export const useGeoSearch = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(query)
    }, 300)

    handler()
    return () => handler.cancel()
  }, [query])

  return useQuery<GeoLocation[], Error>({
    queryKey: ['geoSearch', debouncedQuery],
    queryFn: () => weatherService.searchLocations(debouncedQuery),
    enabled: debouncedQuery.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
    retry: 1
  })
}
