import mongoose, {Document, model, Schema} from 'mongoose';

export interface IMovie extends Document {
  title: string;
  poster: string;
  cinema: string;
  releasedDate:Date;
  genre: string[];
  watched: boolean;
  watchedOn: Date; 
  
}

const movieSchema = new Schema({ 
  title: { type: String, required: true },
  poster: { type: String, required: false },
  cinema: { type: String, required: true },
  releasedDate: { type: Date, required: true },
  genre: { type: [String], required: true },
  watched: { type: Boolean, required: true, default: false },
  watchedOn: { type: Date, required: false },
});

const MovieModel = model("Movie", movieSchema );

export default MovieModel;