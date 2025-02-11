"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const BD_URI = process.env.BD_URI;
// TypeScript no permite la conexion tenga un valor nulo. 
if (!BD_URI) {
    console.error('Error: BD_URI no está definida en el archivo .env');
    process.exit(1);
}
mongoose_1.default.connect(BD_URI, {}).then(() => console.log('Conexion correcta a BD'))
    .catch((error) => {
    console.log('Error al conectar a BD', error.message);
    process.exit(1);
});
// Se indica el puerto de conecion guardado en config.env, si no existe se usa el 3000
const port = process.env.PORT || 3000;
app_1.default.listen(port, () => (console.log(`Listening on port ${port}`)));
