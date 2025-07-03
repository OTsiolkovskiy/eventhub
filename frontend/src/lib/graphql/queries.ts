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

export const GET_EVENT_BY_ID = gql`
  query getEventById($eventId: String!) {
    event(id: $eventId) {
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

export const GET_EVENTS_LOCATIONS = gql`
  query getAllEvents {
    events {
      location
    }
  }
`;

export const GET_FILTERED_EVENTS = gql`
  query GetFilteredEvents($filters: EventFilterInput) {
    events(filters: $filters) {
      id
      title
      date
      location
      status
      totalSeats
      availableSeats
    }
  }
`;
