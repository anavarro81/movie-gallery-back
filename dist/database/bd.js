"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const BD_URI = process.env.BD_URI;
dotenv_1.default.config();
if (!BD_URI) {
    throw new Error('Please define the BD_URI environment variable inside .env');
}
mongoose_1.default.connect(BD_URI, {}).then(() => console.log('Conexion correcta a BD'))
    .catch((error) => {
    console.log('Error al conectar a BD', error.message);
    process.exit(1);
});
