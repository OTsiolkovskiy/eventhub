'use client';

import { EventList } from '@/components/EventList';
import { FilterEvents } from '@/components/FilterEvents';
import { Loader } from '@/components/Loader';
import { Pagination } from '@/components/Pagination';
import { GET_EVENTS_LOCATIONS, GET_FILTERED_EVENTS } from '@/lib/graphql/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

const EVENTS_PER_PAGE = 6;

export default function Home() {
  const [filters, setFilters] = useState({
    location: '',
    dateFrom: undefined as Date | undefined,
    dateTo: undefined as Date | undefined,
    eventStatus: undefined as string | undefined,
  })

  const [page, setPage] = useState<number>(1);

  const realTake = EVENTS_PER_PAGE + 1;
  const skip = (page - 1) * EVENTS_PER_PAGE;

  const { data: filteredData, loading: filteredLoading } = useQuery(GET_FILTERED_EVENTS, {
    variables: {
      filters: {
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        location: filters.location,
        status: filters.eventStatus?.toUpperCase(),
      },
      skip,
      take: realTake
    }
  });

  const dataToShow = filteredData?.events?.data?.slice(0, EVENTS_PER_PAGE) || [];
  const totalCount = filteredData?.events?.totalCount || 0;
  const lastPage = Math.ceil(totalCount / EVENTS_PER_PAGE);

  const { data: locationData } = useQuery(GET_EVENTS_LOCATIONS);

  const handleLocationChange = (value: string) => {
    setFilters(prev => ({ ...prev, location: value === 'none' ? '' : value }));
  };

  const handleStatusChange = (value: string) => {
    setFilters(prev => ({ ...prev, eventStatus: value === 'none' ? undefined : value }));
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-800">
      <h1 className='text-blue-500 font-bold text-5xl text-center p-8'>Eventhub</h1>

      <div className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Filters</h2>

        <FilterEvents
          locationData={locationData}
          location={filters.location}
          onLocationChange={handleLocationChange}
          dateFrom={filters.dateFrom}
          setDateFrom={(date) => setFilters(prev => ({ ...prev, dateFrom: date}))}
          dateTo={filters.dateTo}
          setDateTo={(date) => setFilters(prev => ({ ...prev, dateTo: date}))}
          eventStatus={filters.eventStatus}
          onStatusChange={handleStatusChange}
        />
        
      </div>

      <h2 className='text-xl font-semibold mb-4'>Upcoming events</h2>

      {(filteredLoading) ? (
        <div className="flex justify-center items-center min-h-[50vh] w-full">
          <Loader />
        </div>
      ) : (
        <EventList events={dataToShow} />
      )}

      <Pagination page={page} lastPage={lastPage} setPage={setPage} />
    </div>
   );
}
