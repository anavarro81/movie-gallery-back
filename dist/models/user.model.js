"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movie_model_1 = __importDefault(require("../models/movie.model"));
// Se crea el modelo
// Se indica: ref: MovieModel.modelName para que apunte al nombre del modelo. 
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    movies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: movie_model_1.default.modelName, required: false }]
});
const userModel = (0, mongoose_1.model)("User", userSchema);
exports.default = userModel;
