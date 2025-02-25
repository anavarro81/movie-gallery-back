"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySing = exports.generateSign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Genera un toquen a partir del id y el email del usuario. 
const generateSign = (id, email) => {
    //La firma del token se realiza usando una clave secreta almacenada en la variable de entorno process.env.JWT_KEY.
    const jwtKey = process.env.JWT_KEY;
    // Si no existe la clave, se lanza un error. 
    if (!jwtKey) {
        throw new Error('JWT_KEY no está definido');
    }
    // Se devuelve el token geneado. Se firma con jwtKey. Caduda en 1h.
    return jsonwebtoken_1.default.sign({ id, email }, jwtKey, { expiresIn: "1h" });
};
exports.generateSign = generateSign;
const verifySing = (token) => {
    //La firma del token se realiza usando una clave secreta almacenada en la variable de entorno process.env.JWT_KEY.
    const jwtKey = process.env.JWT_KEY;
    // Si no existe la clave, se lanza un error. 
    if (!jwtKey) {
        throw new Error('JWT_KEY no está definido');
    }
    // Se devuelve el payload con los datos y el token generado. 
    return jsonwebtoken_1.default.verify(token, jwtKey);
};
exports.verifySing = verifySing;
