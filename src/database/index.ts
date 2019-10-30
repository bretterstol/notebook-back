
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/notebook",{useNewUrlParser: true} )

export default mongoose.connection;