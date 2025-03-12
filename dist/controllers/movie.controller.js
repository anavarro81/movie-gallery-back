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
const formidable_plugin_1 = require("../plugins/formidable.plugin");
const cloudinary_plugin_1 = require("../plugins/cloudinary.plugin");
const user_controller_1 = require("../controllers/user.controller");
const newMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Parsear el formulario para obtener los campos y los archivos
    const [fields, files] = yield (0, formidable_plugin_1.parseForm)(req);
    // Extraer los campos del formulario ya que cada uno viene dentro de un array. 
    const movieFields = (0, formidable_plugin_1.extractedFields)(fields);
    // Se comprueba si se ha subido un archivo
    if (!files.poster) {
        res.status(500).json({ message: 'No file uploaded' });
        return;
    }
    // Obtener la ruta del arhivo
    const filePath = files.poster[0].filepath;
    // Subir la imagen a Cloudinary
    const ulrImage = yield (0, cloudinary_plugin_1.uploadImage)(filePath);
    console.log('movieFields', movieFields);
    const userId = movieFields.userId;
    try {
        const Movie = new movie_model_1.default(Object.assign(Object.assign({}, movieFields), { poster: ulrImage }));
        const savedMovie = yield Movie.save();
        if (savedMovie) {
            (0, user_controller_1.addMovieToUser)(userId, savedMovie._id);
        }
        res.status(201).json(savedMovie);
    }
    catch (error) {
        console.log('Error creating movie', error);
        res.status(500).json(error);
    }
});
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
const deleteMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movie_model_1.default.deleteMany({});
        if (movies) {
            res.status(201).json(movies);
        }
    }
    catch (error) {
        console.log('Error loading movies', error);
        res.status(500).json(error);
    }
});
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const movies = yield movie_model_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Movie deleted' });
    }
    catch (error) {
        console.log('Error borrando pelicula', error);
        res.status(500).json(error);
    }
});
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movie_model_1.default.find();
        if (movies) {
            res.status(200).json(movies);
        }
    }
    catch (error) {
        console.log('Error loading movies', error);
        res.status(500).json(error);
    }
});
const moviesController = {
    newMovie,
    loadMovies,
    deleteMovies,
    getAllMovies,
    deleteById
};
exports.default = moviesController;
