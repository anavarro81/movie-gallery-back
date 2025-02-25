import userModel from '../models/user.model'


// Valida el formato del email correcto. Devuelve true o false si cumple con los requisitos del regex 
const validateEmail = (email: string): boolean => {    
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase())
}

const validatePassword = (password: string): boolean => {
    
    //  REGEX PASSWORD 1 Uppercase 1 Lowercase 1 number, minimo 8  
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; 

    // String(password) -> Convierte a cadena de texto. Para asegurarse de que lo es. 
    return regex.test(String(password))
 
}

const usedEmail = async (email: string): Promise<boolean> => {

    try {
        const usedEmail = await userModel.find({email: email})
        return usedEmail.length > 0 ? true : false 
    } catch (error) {
        throw new Error ("Error buscando el emai");
    }
    
    
        
    
}


export {validateEmail, validatePassword, usedEmail} 

