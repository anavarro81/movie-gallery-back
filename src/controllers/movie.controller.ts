import {Request, Response} from 'express';
import MovieModel from '../models/movie.model';
import {parseForm, extractedFields}  from '../plugins/formidable.plugin';
import {uploadImage} from '../plugins/cloudinary.plugin';
import {addMovieToUser} from '../controllers/user.controller';

const newMovie = async (req: Request, res: Response):Promise<void>  => {

    // Parsear el formulario para obtener los campos y los archivos
    const [fields, files]= await parseForm(req)    

    // Extraer los campos del formulario ya que cada uno viene dentro de un array. 
    const movieFields = extractedFields(fields);    

    // Se comprueba si se ha subido un archivo
    if (!files.poster) {
        res.status(500).json({ message: 'No file uploaded' });
        return;
    }
    
    // Obtener la ruta del arhivo
    const filePath = files.poster[0].filepath;

    // Subir la imagen a Cloudinary
    const ulrImage = await uploadImage(filePath) 

    console.log('movieFields', movieFields)

    const userId = movieFields.userId

    try {
        const Movie = new MovieModel({...movieFields, poster: ulrImage})
        const savedMovie = await Movie.save()

        

        if (savedMovie){
            addMovieToUser(userId, savedMovie._id )
        }

        res.status(201).json(savedMovie)
    } catch (error) {
        console.log('Error creating movie', error)
        res.status(500).json(error)
    }

}

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

const deleteById = async (req: Request, res: Response):Promise<void>  => {

    try {
        const { id } = req.params
        const movies = await MovieModel.findByIdAndDelete(id)
        res.status(200).json({message: 'Movie deleted'})
    } catch (error) {
        console.log('Error borrando pelicula', error)  
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
    newMovie,
    loadMovies,
    deleteMovies,
    getAllMovies,
    deleteById
}



export default moviesController;