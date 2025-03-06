import mongoose, {Document, model, Schema} from 'mongoose';


// Se crea la interface
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

// Se crea el modelo
const userSchema = new Schema({
    name : {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
})

const userModel = model("User", userSchema)

export default userModel
