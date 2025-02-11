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
const movie_model_1 = __importDefault(require("../models/movie.model"));
const loadMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moviestoInsert = req.body;
        const movies = yield movie_model_1.default.insertMany(moviestoInsert);
        if (movies) {
            res.status(201).json(movies);
        }
    }
    catch (error) {
        console.log('Error loading movies', error);
        res.status(500).json(error);
    }
});
const moviesController = {
    loadMovies
};
exports.default = moviesController;
