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
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validators_1 = require("../utils/validators");
const jwt_1 = require("../utils/jwt");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new user_model_1.default(req.body);
        if (!newUser.email) {
            res.status(400).json({ error: 'email no informado' });
            return;
        }
        if (!newUser.password) {
            res.status(400).json({ error: 'password no informado' });
            return;
        }
        if (!(0, validators_1.validateEmail)(newUser.email)) {
            res.status(400).json({ error: "email no válido" });
            return;
        }
        if (!(0, validators_1.validatePassword)(newUser.password)) {
            res.status(400).json({ error: "password no válida" });
            return;
        }
        const existEmail = yield (0, validators_1.usedEmail)(newUser.email);
        if (existEmail) {
            res.status(400).json({ error: "Email ya registrado" });
            return;
        }
        newUser.password = bcrypt_1.default.hashSync(newUser.password, 10);
        const createdUser = yield newUser.save();
        res.status(201).json({ createdUser });
    }
    catch (error) {
        console.log('Error en el registro del usuario: ', error);
        res.status(500).json({ error: error });
    }
});
exports.register = register;
// RequestHandler es una firma de tipo genérica proporcionada por Express que acepta Request, Response y NextFunction, lo que elimina la necesidad de definirlos manualmente.
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let token = "";
    try {
        // Busca el usuario por email
        const user = yield user_model_1.default.findOne({ email: email });
        // Si no existe, devuelve error.
        if (!user) {
            res.status(404).json({ "message": "correo o password no correctas" });
            return;
        }
        // Comprueba que user.password este definido antes comprar la password
        // Si no coincide la password da error. 
        if (user.password && !bcrypt_1.default.compareSync(password, user.password)) {
            res.status(404).json({ message: "password incorrecto" });
            return;
        }
        if (!user.email) {
            res.status(400).json({ "message": "email no informado" });
            return;
        }
        // No se devuelve la password
        user.password = undefined;
        // Se genera el token | user._id se convierte a String desde tipo objectId para que coincida con la firma de la función. 
        if (user.email) {
            token = (0, jwt_1.generateSign)(user._id.toString(), user.email);
        }
        else {
            throw new Error('User email is missing');
        }
        res.status(200).json({ user: user, token: token });
    }
    catch (error) {
        console.log('error en el login ', error);
        res.status(500).json({ "error": error });
    }
});
exports.login = login;
