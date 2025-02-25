import mongoose, {Document, model, Schema} from 'mongoose';


// Se crea la interface
export interface IUser extends Document {
    email: string;
    password: string;
}

// Se crea el modelo
const userSchema = new Schema({
    email: {type: String, require: true},
    password: {type: String, require: true}
})

const userModel = model("User", userSchema)

export default userModel
