import {Note, NoteDocument} from '../database/model';
import { Document, Model } from 'mongoose';

interface NoteInterface{
    description: string;
    tags: string[];
    text: string;
}

interface NoteID{
    _id: string
}

interface Tag{
    tag: string;
}

const resolvers = {
    Query: {
        notes: async () => await findDoc(Note, {}),
        note: async (_:any, {_id}: NoteID) => {
            const [result, __] = await findDoc(Note, {_id})
            return result;
        },
        noteByTag: async (_:any, {tag}:Tag) => await findDoc(Note, {tags: tag}),
    }, 
    Mutation: {
        addNote: async (_:any, {description, tags, text}: NoteInterface) => {
            console.log(description, tags, text)
            return await saveDoc(new Note({description, tags, text, created: Date.now()}));
        },
        updateNote: async (_:any, query: NoteInterface&NoteID) => {
            const {_id} = query;
            const [doc, __] = await findDoc(Note, {_id});
            const updatedDoc = updateNote(doc as NoteDocument, query);
            return await saveDoc(updatedDoc);
        }
    }
}


function updateNote(doc: NoteDocument, query: NoteInterface){
    if(query.description){
        doc.description = query.description;
    }
    if(query.tags){
        doc.tags = query.tags;
    }
    if(query.text){
        doc.text = query.text;
    }
    doc.modified = String(Date.now());
    return doc;
}

function findDoc(model:Model<Document, {}>, fields: {}): Promise<Document[]>{
    console.log("vi er i gang")
    return new Promise((resolve, reject) => {
        model.find(fields, (err, res) => {
            if(err) reject(err);
            else resolve(res);
        });
    });
}

function saveDoc(doc:Document): Promise<Document>{
    return new Promise((resolve, reject) => {
        doc.save((err, savedDoc) => {
            if(err) reject(err);
            else resolve(savedDoc);
        });
    });
}

export default resolvers;
