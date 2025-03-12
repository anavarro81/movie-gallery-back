import mongoose, {Document, model, Schema} from 'mongoose';
import MovieModel from '../models/movie.model'

// Se crea la interface
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    movies: [
        {
            type: Schema.Types.ObjectId
        }
    ]
    
}

// Se crea el modelo
// Se indica: ref: MovieModel.modelName para que apunte al nombre del modelo. 
const userSchema = new Schema({
    name : {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    movies: [ { type: Schema.Types.ObjectId, ref: MovieModel.modelName,  required: false} ]            
     
})

const userModel = model("User", userSchema)

export default userModel
