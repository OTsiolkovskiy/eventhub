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

  const { data: filteredData, loading: filteredLoading } = useQuery(GET_FILTERED_EVENTS, {
    variables: {
      filters: {
        dateFrom,
        dateTo,
        location,
        status: eventStatus?.toUpperCase(),
      }
    }
  });

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
        <EventList events={filteredData.events || []} />
      )}
    </div>
   );
}
