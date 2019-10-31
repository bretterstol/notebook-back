
import mongoose from 'mongoose';
import { dbHost } from '../utils';

mongoose.connect(dbHost,{useNewUrlParser: true} )
console.log(dbHost)
export default mongoose.connection;