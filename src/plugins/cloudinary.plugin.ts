import cloudinary from "../config/cloudinaryConfig";

export const uploadImage = async (filePath: string)=> {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary: ', error);
        throw error
        
    }
}
