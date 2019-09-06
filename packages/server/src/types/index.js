import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

/* 
  Get all .graphql files recursively
*/
const typesArray = fileLoader(path.join(__dirname, '/**/*.graphql'), {
  recursive: true,
});

/* 
  Get all .js files recursively
*/
const resolversArray = fileLoader(path.join(__dirname, './**/*.resolvers.js'), {
  recursive: true,
});

/* Export resolvers and types already merged */
export const resolvers = mergeResolvers(resolversArray, { all: true });
export const typeDefs = mergeTypes(typesArray, { all: true });
