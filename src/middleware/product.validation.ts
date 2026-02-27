import { body, param } from "express-validator";

export const createProductValidation = [
    //Validacion de data recibida en el Router - npm i express-validator
    //body se le pasa el nombre del campo que se quiere validar, luego se le encadena el metodo
    // notEmpty() para validar que el campo no este vacio, y con withMessage() se le pasa el mensaje de error 
    //que se quiere mostrar si la validacion falla, y por ultimo se le pasa la peticion req para que pueda acceder a los datos que el cliente envio
    body('name') //body es para no asincrono y await es para asincrono
            .trim() // elimina espacios  "   texto   "  ->para luego validar que no este vacio "texto"
            .notEmpty().withMessage('El nombre de producto no puede ir vacio')
            .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
            
    body('price')
        .notEmpty().withMessage('El precio de producto no puede ir vacio')
        .isNumeric().withMessage('Valor no valido')
            //validacion personalizada para validar que el precio sea mayor a 0
        .custom((value) => value > 0).withMessage('El precio no valido, debe ser mayor a 0'),
         
]

export const productIdValidation = [
    //param('id').isInt().withMessage('ID no valido'),
  param('id')
    .isInt({ gt: 0 }) //gt significa "greater than" y se le pasa el valor 0 para validar que el id sea un numero entero positivo
    .withMessage('El ID debe ser un numero entero positivo')
];

export const updateProductValidation = [
  body('name')
    .optional() //actualización flexible, el campo name no es obligatorio ya que puede ya estar pero si viene, se valida
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({ min: 3, max: 100 }),

  body('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('El precio debe ser mayor a 0'),

body('availability')
    .optional()
    .isBoolean().withMessage('Valor para disponibilidad no valido')
];

export const updateAvailabilityValidation = [
  body('availability')
    //.notEmpty().withMessage('Availability es obligatorio')
    .isBoolean().withMessage('Availability debe ser true o false')
];