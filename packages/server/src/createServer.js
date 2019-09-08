import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './types';

/* 
  Returns new Apollo Server instanc
*/
export default function createServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    playground: process.env.NODE_ENV !== 'production',
    context: ({ req, res }) => ({ req, res }),
  });
}
