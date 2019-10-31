import {ApolloServer} from 'apollo-server-lambda';


export default (input:any) => {
    const server = new ApolloServer(input);
    return server.createHandler({
        cors: {
            origin: "*"
        }
    });
}