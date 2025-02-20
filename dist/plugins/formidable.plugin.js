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
exports.extractedFields = exports.parseForm = void 0;
const formidable_1 = __importDefault(require("formidable"));
const parseForm = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const form = (0, formidable_1.default)({});
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err)
                reject(err);
            else
                resolve([fields, files]);
        });
    });
});
exports.parseForm = parseForm;
const extractedFields = (fields) => {
    const extractedFields = {};
    for (const key in fields) {
        if (fields[key] !== undefined) {
            extractedFields[key] = fields[key][0];
        }
    }
    return extractedFields;
};
exports.extractedFields = extractedFields;
