"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usedEmail = exports.validatePassword = exports.validateEmail = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// Valida el formato del email correcto. Devuelve true o false si cumple con los requisitos del regex 
const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};
exports.validateEmail = validateEmail;
const validatePassword = (password) => {
    //  REGEX PASSWORD 1 Uppercase 1 Lowercase 1 number, minimo 8  
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // String(password) -> Convierte a cadena de texto. Para asegurarse de que lo es. 
    return regex.test(String(password));
};
exports.validatePassword = validatePassword;
const usedEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usedEmail = yield user_model_1.default.find({ email: email });
        return usedEmail.length > 0 ? true : false;
    }
    catch (error) {
        throw new Error("Error buscando el emai");
    }
});
exports.usedEmail = usedEmail;
