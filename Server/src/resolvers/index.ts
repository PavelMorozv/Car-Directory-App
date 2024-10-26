// src/resolvers/index.ts
import carResolvers from "./carResolvers";

const resolvers = {
  Query: {
    ...carResolvers.Query
  },
  Mutation: {
    ...carResolvers.Mutation
  }
};

export default resolvers;
