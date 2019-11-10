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

    type NoteID {
        _id: ID!
    }

    type Query {
        notes: [Note]
        note(_id: ID!): Note
        noteByTag(tag:String!): [Note]
    }

    type Mutation {
        addNote(description: String!, tags: [String!]!, text: String!): Note
        updateNote(_id: ID!, description: String, tags: [String], text: String): Note
        deleteNote(_id:ID!): NoteID
    }
`;

export default typeDefs;