import express from 'express';
import {register, login, getUserMovies} from '../controllers/user.controller'

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login)
userRouter.get('/user-movies/:id', getUserMovies)

export default userRouter;