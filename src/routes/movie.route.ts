import express from 'express';
import moviesController from "../controllers/movie.controller";

const moviesRouter = express.Router();

moviesRouter.post('/load-movies', moviesController.loadMovies);
moviesRouter.delete('/delete-movies', moviesController.deleteMovies);
moviesRouter.get('/all-movies', moviesController.getAllMovies);

export default moviesRouter;