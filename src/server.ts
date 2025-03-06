
import express, { Express, Request, Response } from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import moviesRouter from "./routes/movie.route";
import userRouter from "./routes/user.route"
import { optionCors } from "./config/cors.config";
import cors from 'cors'
import  moviesController from "../src/controllers/movie.controller";

dotenv.config()

const BD_URI = process.env.BD_URI

// TypeScript no permite la conexion tenga un valor nulo. 
if (!BD_URI) {
  console.error('Error: BD_URI no está definida en el archivo .env');
  process.exit(1);
}

const app = express();
// convierte los datos JSON en objetos JavaScript accesibles a través de req.body
// app.use(cors(optionCors)); // Config de cors


app.use(cors({
  origin: "*", // Cambia esto por el puerto de tu frontend
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true // Permite el uso de cookies y headers de autenticación
}));


app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server!!");
});



app.use('/movies', moviesRouter)
app.use('/user', userRouter)

// Si la ruta no existe, se envia un mensaje de error
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada :/')
})



mongoose.connect(BD_URI,{
}).then ( () => console.log('Conexion correcta a BD'))
.catch( (error) => {
  console.log('Error al conectar a BD', error.message);
  process.exit(1);
})

// Se indica el puerto de conecion guardado en config.env, si no existe se usa el 3000
const port = process.env.PORT || 3000

console.log('estoy en server.ts')


app.listen(port, () => (console.log(`Listening on port ${port}`)))
