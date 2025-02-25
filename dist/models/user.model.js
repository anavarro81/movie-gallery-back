"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Se crea el modelo
const userSchema = new mongoose_1.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true }
});
const userModel = (0, mongoose_1.model)("User", userSchema);
exports.default = userModel;
