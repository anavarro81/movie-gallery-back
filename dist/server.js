"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const movie_route_1 = __importDefault(require("./routes/movie.route"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const BD_URI = process.env.BD_URI;
// TypeScript no permite la conexion tenga un valor nulo. 
if (!BD_URI) {
    console.error('Error: BD_URI no está definida en el archivo .env');
    process.exit(1);
}
const app = (0, express_1.default)();
// convierte los datos JSON en objetos JavaScript accesibles a través de req.body
// app.use(cors(optionCors)); // Config de cors
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Cambia esto por el puerto de tu frontend
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true // Permite el uso de cookies y headers de autenticación
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server!!");
});
app.use('/movies', movie_route_1.default);
// Si la ruta no existe, se envia un mensaje de error
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada :/');
});
mongoose_1.default.connect(BD_URI, {}).then(() => console.log('Conexion correcta a BD'))
    .catch((error) => {
    console.log('Error al conectar a BD', error.message);
    process.exit(1);
});
// Se indica el puerto de conecion guardado en config.env, si no existe se usa el 3000
const port = process.env.PORT || 3000;
console.log('estoy en server.ts');
app.listen(port, () => (console.log(`Listening on port ${port}`)));
