import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';

const BD_URI = process.env.BD_URI;

dotenv.config();

if (!BD_URI) {
  throw new Error('Please define the BD_URI environment variable inside .env');
}



mongoose.connect(BD_URI,{
}).then ( () => console.log('Conexion correcta a BD'))
.catch( (error) => {
  console.log('Error al conectar a BD', error.message);
  process.exit(1);
})