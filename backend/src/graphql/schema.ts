import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum EventStatus {
    SCHEDULED
    CANCELLED
    COMPLETED
  }

  input EventFilterInput {
    id: String
    dateFrom: String
    dateTo: String
    location: String
    status: String
  }

  type Query {
    me: User
    role: [Role!]!
    events(filters: EventFilterInput): [Event!]!
    event(id: String!): Event!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload

    createRole(name: String!): Role
    deleteRole(id: String!): Role
    updateRole(id: String!, name: String!): Role

    createEvent(input: CreateEventInput): Event!
    updateEvent(id: String!, input: UpdateEventInput!): Event!
    deleteEvent(id: String!): Event!
  }

  input CreateEventInput {
    title: String!
    description: String
    date: String!
    location: String
    totalSeats: Int!
    status: EventStatus = SCHEDULED
  }

  input UpdateEventInput {
    title: String
    description: String
    date: String
    location: String
    totalSeats: Int
    status: EventStatus
  }

  type User {
    id: ID!
    email: String!
    userName: String!
    roleId: String!
  }

  type Role {
    id: String!
    name:  String!
    users: [User!]
  }

  type Event {
    id: String!
    title: String!
    description: String
    date: String!
    location: String!
    totalSeats:  Int!
    availableSeats: Int
    status: EventStatus!
    createdAt: String!
    updatedAt: String

    bookings: [Booking]
  }

  type AuthPayload {
    token: String!
  }

  type Booking {
    id: String!
    user: User!
    event: Event!
    seats: Int!
    createdAt: String!
  }
`;
