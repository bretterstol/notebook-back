import {Note, NoteDocument} from '../database/model';
import { Document, Model } from 'mongoose';
import {pipe} from "fp-ts/lib/pipeable";
import {tryCatch, TaskEither, fold} from 'fp-ts/lib/TaskEither';
import * as T from 'fp-ts/lib/Task';
import { getNow } from '../utils';

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
        notes: async () => {
            return await pipe(
                findNewDoc(Note, {}),
                fold<Error, Document[], Error|Document[] >(
                    (e:Error) => T.of(e),
                    (doc:Document[]) => T.of(doc)
                )
            )()
        },
        note: async (_:any, {_id}: NoteID) => {
            const [result, __] = await findDoc(Note, {_id})
            return result;
        },
        noteByTag: async (_:any, {tag}:Tag) => await findDoc(Note, {tags: tag}),
    }, 
    Mutation: {
        addNote: async (_:any, {description, tags, text}: NoteInterface) => {
            return await saveDoc(new Note({description, tags, text, created: getNow()}));
        },
        updateNote: async (_:any, query: NoteInterface&NoteID) => {
            const {_id} = query;
            const [doc, __] = await findDoc(Note, {_id});
            const updatedDoc = updateNote(doc as NoteDocument, query);
            return await saveDoc(updatedDoc);
        },
        deleteNote: (_:any, {_id}: NoteID) => {
            return deleteDocById(Note, _id);
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
    doc.modified = getNow();
    return doc;
}

function findNewDoc(model:Model<Document, {}>, fields: {}):TaskEither<Error, Document[]>{
    return tryCatch<Error, Document[]>(
        () => new Promise(resolve => model.find(fields, (_:any, res:Document[]) => resolve(res))),
        e => new Error(String(e))
    )
}
function findDoc(model:Model<Document, {}>, fields: {}):Promise<Document[]>{
    return new Promise((resolve, reject) => {
        model.find(fields, (err, res:Document[]) => {
            if(err) reject(err)
            else resolve(res)
        })
    })
}

function deleteDocById(model:Model<Document, {}>, id:string): Promise<{_id: string}>{
    return new Promise((resolve, reject) => {
        model.deleteOne({_id: id}, (err) => {
            if (err) reject(err);
            else resolve({_id: id});
        })
    })
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
