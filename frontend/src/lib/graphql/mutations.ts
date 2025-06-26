import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    register (name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;
