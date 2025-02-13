"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_controller_1 = __importDefault(require("../controllers/movie.controller"));
const moviesRouter = express_1.default.Router();
moviesRouter.post('/load-movies', movie_controller_1.default.loadMovies);
moviesRouter.delete('/delete-movies', movie_controller_1.default.deleteMovies);
moviesRouter.get('/all-movies', movie_controller_1.default.getAllMovies);
exports.default = moviesRouter;
