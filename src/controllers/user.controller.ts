import userModel from '../models/user.model';
import bcrypt from 'bcrypt';
    import { RequestHandler } from 'express';

import {validateEmail, 
    validatePassword, 
    usedEmail}
    from '../utils/validators'

import {generateSign} from '../utils/jwt'



export const register: RequestHandler = async (req, res) => {

    
    try {
        const newUser = new userModel(req.body)

        if (!newUser.email) {
            res.status(400).json({error: 'email no informado'})
            return
        }

        if (!newUser.password) {
            res.status(400).json({error: 'password no informado'})
            return
        }

        if (!validateEmail(newUser.email)) {
            res.status(400).json({error: "email no válido"})
            return
        }

        if (!validatePassword(newUser.password)) {
            res.status(400).json({error: "password no válida"})
            return
        }

        const existEmail = await usedEmail(newUser.email)

        if (existEmail){
            res.status(400).json({error: "Email ya registrado"})
            return
        }

        newUser.password = bcrypt.hashSync(newUser.password, 10)

        const createdUser = await newUser.save()

        res.status(201).json({createdUser})
        
    } catch (error) {
        console.log('Error en el registro del usuario: ', error)
        res.status(500).json({error: error})
        
    }

}

// RequestHandler es una firma de tipo genérica proporcionada por Express que acepta Request, Response y NextFunction, lo que elimina la necesidad de definirlos manualmente.
export const login: RequestHandler = async (req, res) => {

    const {email, password} = req.body
    let token = ""


    try {


        // Busca el usuario por email
        const user = await userModel.findOne({email: email})

        // Si no existe, devuelve error.
        if (!user) {
            res.status(404).json({"message": "correo o password no correctas"})
            return
        }

        // Comprueba que user.password este definido antes comprar la password
        // Si no coincide la password da error. 




        if (user.password && !bcrypt.compareSync(password, user.password)) {
            res.status(404).json({ message: "password incorrecto" });
            return
        }

        if (!user.email) {
            res.status(400).json({"message": "email no informado" })
            return
        }

        // No se devuelve la password
        user.password = undefined

        // Se genera el token | user._id se convierte a String desde tipo objectId para que coincida con la firma de la función. 
        if (user.email) {
            token = generateSign(user._id.toString(), user.email);
        } else {
            throw new Error('User email is missing');
        }

        

        res.status(200).json({id: user._id, email: user.email, name: user.name, token: token})
        

        
    } catch (error) {

        console.log('error en el login ', error)
        res.status(500).json({"error": error})
        
    }
    
    

}

