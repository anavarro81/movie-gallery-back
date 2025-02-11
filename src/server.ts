
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from "./app"
dotenv.config()

const BD_URI = process.env.BD_URI

// TypeScript no permite la conexion tenga un valor nulo. 
if (!BD_URI) {
  console.error('Error: BD_URI no está definida en el archivo .env');
  process.exit(1);
}


mongoose.connect(BD_URI,{
}).then ( () => console.log('Conexion correcta a BD'))
.catch( (error) => {
  console.log('Error al conectar a BD', error.message);
  process.exit(1);
})

// Se indica el puerto de conecion guardado en config.env, si no existe se usa el 3000
const port = process.env.PORT || 3000


app.listen(port, () => (console.log(`Listening on port ${port}`)))
