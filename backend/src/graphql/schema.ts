export const typeDefs = `#graphql
  type Query {
    me: User
    role: [Role!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createRole(name: String!): Role
    deleteRole(id: String!): Role
    updateRole(id: String!, name: String!): Role
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

  type AuthPayload {
    token: String!
  }
`;
