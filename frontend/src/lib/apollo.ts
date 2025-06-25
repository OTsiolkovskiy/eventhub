import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://eventhub-3xuw.onrender.com/graphql',
  cache: new InMemoryCache(),
});