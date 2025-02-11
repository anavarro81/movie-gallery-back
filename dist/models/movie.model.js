"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    poster: { type: String, required: true },
    cinema: { type: String, required: true },
    releasedDate: { type: Date, required: true },
    genre: { type: [String], required: true },
    watched: { type: Boolean, required: true, default: false },
    watchedOn: { type: Date, required: false },
});
const MovieModel = (0, mongoose_1.model)("Movie", movieSchema);
exports.default = MovieModel;
