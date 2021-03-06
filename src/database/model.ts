import {Schema, model, Document} from 'mongoose';

export interface NoteDocument extends Document{
    description: string,
    tags: string[],
    text: String,
    created: string,
    modified?: string
}

const noteSchema = new Schema({
    description: String,
    tags: [{type:String}],
    text: String,
    created: String,
    modified: String
});

export const Note = model("note", noteSchema);

