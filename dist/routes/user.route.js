"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.post('/register', user_controller_1.register);
userRouter.post('/login', user_controller_1.login);
userRouter.get('/user-movies/:id', user_controller_1.getUserMovies);
exports.default = userRouter;
