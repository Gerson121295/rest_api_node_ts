import { Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    //console.log('Desde Midelware.')
    
    //Implementacion Validacion desde el router
    //validationResult se le pasa la peticion req para que pueda acceder a los datos que el cliente envio y validar si hay errores
    let errors = validationResult(req) 

    //Si errores no esta vacio, es decir, si hay errores, se le responde al cliente con un status 400 y se le envia un json con los errores que se encontraron
    if (!errors.isEmpty()) { 
        return res.status(400).json({ 
            ok: false,
            errors: errors.array() 
        })
    }

    next(); //Dice que continue con la siguiente funcion porque ya termino de ejecutar codigo de handleInputError 
}


