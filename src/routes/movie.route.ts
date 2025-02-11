import express from 'express';
import moviesController from "../controllers/movie.controller";

const moviesRouter = express.Router();

moviesRouter.post('/load-movies', moviesController.loadMovies);

export default moviesRouter;