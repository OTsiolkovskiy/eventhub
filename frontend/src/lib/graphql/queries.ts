import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query getAllEvents {
    events {
      id
      title
      location
      description
      date
      totalSeats
      status
    }
  }
`;