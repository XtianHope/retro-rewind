const typeDefs = `#graphql
  type User{
    _id: ID
    username: String
    email: String
    password: String
    gameTag: String
    scores: [Int]
  }

  type Question {
    id: ID
    question: String
    image: String
    options: [String]
    answer: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!, gameTag:String!): Auth
    login(email:String!, password:String!): Auth
    addScoreToUser(score: Int): User
  }
`;

module.exports = typeDefs;
