
import {ApolloServer } from 'apollo-server';
import { isDev } from './utils';

import typeDefs from './graphql/TypeDef';
import resolvers from './graphql/resolvers';

import dbConnection from './database/index';
import lambdaHandler from './lambdaHandler';

dbConnection.on("error", () => console.log("BUUUU"));
dbConnection.once("open", () => console.log("Database up and running"));

const runDevServer = () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: isDev,
        introspection: isDev,
    });

    server.listen().then(({ url }) => {
        console.log(`server ready on url: ${url}`)
    });
}

export const graphqlHandler = lambdaHandler({typeDefs, resolvers});

if(isDev) runDevServer();