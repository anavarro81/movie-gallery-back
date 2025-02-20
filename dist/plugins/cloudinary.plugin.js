"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
const uploadImage = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinaryConfig_1.default.uploader.upload(filePath);
        return result.secure_url;
    }
    catch (error) {
        console.error('Error uploading image to Cloudinary: ', error);
        throw error;
    }
});
exports.uploadImage = uploadImage;
