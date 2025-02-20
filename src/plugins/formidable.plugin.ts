import formidable from 'formidable';
import { Request } from 'express';

export const parseForm = async (req: Request): Promise<[formidable.Fields, formidable.Files]> => {
    const form = formidable({})    

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve([fields, files]);
        });
    });
}

export const extractedFields = (fields: formidable.Fields): { [key: string]: any } => {
    const extractedFields: { [key: string]: any } = {};
    for (const key in fields) {
        if (fields[key] !== undefined) {
            extractedFields[key] = fields[key][0];
        }
    }
    return extractedFields;
}

