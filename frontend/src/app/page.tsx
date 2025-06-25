'use client';

import { gql, useQuery } from '@apollo/client';

const GET_EVENTS = gql`
  query getAllEvents {
    events {
      id
      title
      location
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return 'Loading! ...'
  if (error) return `Error: ${error.message}`;

  console.log('1111111111111111', data);
  
  return (
    <main className="min-h-screen flex items-center justify-center">
    <h1 className="text-3xl font-bold">Welcome to EventHub</h1>
  </main>
  );
}
