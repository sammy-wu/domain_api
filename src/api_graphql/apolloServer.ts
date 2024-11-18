import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { SavedListingResolver } from './resolvers/SavedListingResolver';

export async function createApolloServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver, SavedListingResolver],
    validate: false,
    emitSchemaFile: {
      path: 'schema.graphql', // Specify the output file path
      sortedSchema: false, // Sort the schema output
    },
  });

  return new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });
}
