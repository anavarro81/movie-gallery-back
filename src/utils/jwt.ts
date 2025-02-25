import jwt from "jsonwebtoken";


// Genera un toquen a partir del id y el email del usuario. 
const generateSign = (id: string, email:string): string => {

    //La firma del token se realiza usando una clave secreta almacenada en la variable de entorno process.env.JWT_KEY.
    const jwtKey = process.env.JWT_KEY
    
    // Si no existe la clave, se lanza un error. 
    if (!jwtKey) {
        throw new Error ('JWT_KEY no está definido')
    }
    
    // Se devuelve el token geneado. Se firma con jwtKey. Caduda en 1h.
    return jwt.sign({id, email}, jwtKey, {expiresIn: "1h"})

}

const verifySing =(token: string): any => {
    //La firma del token se realiza usando una clave secreta almacenada en la variable de entorno process.env.JWT_KEY.
    const jwtKey = process.env.JWT_KEY
    
    // Si no existe la clave, se lanza un error. 
    if (!jwtKey) {
        throw new Error ('JWT_KEY no está definido')
    }
    
    // Se devuelve el payload con los datos y el token generado. 
    return jwt.verify(token, jwtKey)
}
// Exportación nombrada
export {generateSign, verifySing}
