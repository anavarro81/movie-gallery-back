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
exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validators_1 = require("../utils/validators");
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
