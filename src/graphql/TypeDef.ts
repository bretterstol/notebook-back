import {gql} from 'apollo-server';

const typeDefs = gql`
    type Note {
        _id: ID!
        description: String!
        tags: [String!]!
        text: String!
        created: String!
        modified: String
    }

    type Query {
        notes: [Note]
        note(_id: ID!): Note
        noteByTag(tag:String!): [Note]
    }

    type Mutation {
        addNote(description: String!, tags: [String!]!, text: String!): Note
        updateNote(_id: String!, description: String, tags: [String], text: String): Note
    }
`;

export default typeDefs;