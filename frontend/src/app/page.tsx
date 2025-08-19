'use client';

import { EventList } from '@/components/EventList';
import { FilterEvents } from '@/components/FilterEvents';
import { Loader } from '@/components/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GET_EVENTS_LOCATIONS, GET_FILTERED_EVENTS } from '@/lib/graphql/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

export default function Home() {
  const [location, setLocation] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [eventStatus, setEventStatus] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(1);

  const take = 6;
  const realTake = take + 1;
  const skip = (page - 1) * take;

  const { data: filteredData, loading: filteredLoading } = useQuery(GET_FILTERED_EVENTS, {
    variables: {
      filters: {
        dateFrom,
        dateTo,
        location,
        status: eventStatus?.toUpperCase(),
      },
      skip,
      take: realTake
    }
  });

  const dataToShow = filteredData?.events?.data?.slice(0, take) || [];
  const totalCount = filteredData?.events?.totalCount || 0;
  const lastPage = Math.ceil(totalCount / take);

  const { data: locationData } = useQuery(GET_EVENTS_LOCATIONS);

  const handleLocationChange = (value: string) => {
    setLocation(value === 'none' ? '' : value);
  };

  const handleStatusChange = (value: string) => {
    setEventStatus(value === 'none' ? '' : value);
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-800">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <h1 className='text-blue-500 font-bold text-5xl text-center p-8'>Eventhub</h1>

      <div className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Filters</h2>

        <FilterEvents
          locationData={locationData}
          location={location}
          onLocationChange={handleLocationChange}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          eventStatus={eventStatus}
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
      
      <div className='flex gap-8 justify-center mt-5'>
        <button
          type='button'
          className={page <= 1 ? 'text-gray-700' : 'text-white'}
          disabled={page <= 1}
          onClick={() => setPage(1)}
        >
          {'<<'}
        </button>
        <button
          type='button'
          className={page <= 1 ? 'text-gray-700' : 'text-white'}
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          {'Prev <'}
        </button>
        <span className='text-white'>Page {page}</span>
        <button
          type='button'
          className={page >= lastPage ? 'text-gray-700' : 'text-white'}
          disabled={page >= lastPage}
          onClick={() => setPage(prev => Math.min(prev + 1, lastPage))}
        >
          {'> Next'}
        </button>
        <button
          className={page >= lastPage ? 'text-gray-700' : 'text-white'}
          disabled={page >= lastPage}
          onClick={() => setPage(lastPage)}
        >
          {'>>'}
        </button>
      </div>

    </div>
   );
}
