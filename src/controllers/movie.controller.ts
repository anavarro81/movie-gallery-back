import {Request, Response} from 'express';
import MovieModel from '../models/movie.model';

const loadMovies = async (req: Request, res: Response):Promise<void>  => {
    try {

        const moviestoInsert= req.body

        const movies = await MovieModel.insertMany(moviestoInsert)

        if(movies){
            res.status(201).json(movies)
        }
        
    } catch (error) {
        console.log('Error loading movies', error)  
        res.status(500).json(error)
    }
}

const deleteMovies = async (req: Request, res: Response):Promise<void>  => {
    try {

        const movies = await MovieModel.deleteMany({})

        if(movies){
            res.status(201).json(movies)
        }
        
    } catch (error) {
        console.log('Error loading movies', error)  
        res.status(500).json(error)
    }
}

const getAllMovies = async (req: Request, res: Response): Promise<void> => {
    
    try {
        const movies = await MovieModel.find()

        if(movies){
            res.status(200).json(movies)
        }
        
    } catch (error) {
        console.log('Error loading movies', error)  
        res.status(500).json(error)
    }
}

const moviesController = {
    loadMovies,
    deleteMovies,
    getAllMovies
}



export default moviesController;