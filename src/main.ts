
import {ApolloServer } from 'apollo-server';
import { isDev } from './utils';

import typeDefs from './graphql/TypeDef';
import resolvers from './graphql/resolvers';

import dbConnection from './database/index';

dbConnection.on("error", () => console.log("BUUUU"));
dbConnection.once("open", () => console.log("Database up and running"));

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    playground: isDev,
    introspection: isDev,
});

server.listen().then(({url}) => {
    console.log(`server ready on url: ${url}`)
});
