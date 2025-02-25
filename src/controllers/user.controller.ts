import userModel from '../models/user.model';
import bycript from 'bcrypt';
import {Request, Response} from 'express'

import {validateEmail, 
    validatePassword, 
    usedEmail}
    from '../utils/validators'

const register = async (req: Request, res: Response) => {

    
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

        newUser.password = bycript.hashSync(newUser.password, 10)

        const createdUser = await newUser.save()

        res.status(201).json({createdUser})
        
    } catch (error) {
        console.log('Error en el registro del usuario: ', error)
        res.status(500).json({error: error})
        
    }

}


export {register} 