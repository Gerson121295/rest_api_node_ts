import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";
import { createProductValidation, productIdValidation, updateAvailabilityValidation, updateProductValidation } from "./middleware/product.validation";
import { param } from "express-validator";

const router = Router();

//Routing
//cuando se visita la url / se envia la peticion req, y se resive la respuesta res
router.get('/', getProducts);

router.get('/:id',
    //validacion
    productIdValidation, //param('id').isInt().withMessage('ID no valido'),
    handleInputErrors, //middleware de validacion de errors de campos
    getProductById);
    
router.post('/', 
    //Validacion de data recibida en el Router - npm i express-validator
    //body se le pasa el nombre del campo que se quiere validar, luego se le encadena el metodo
    // notEmpty() para validar que el campo no este vacio, y con withMessage() se le pasa el mensaje de error 
    //que se quiere mostrar si la validacion falla, y por ultimo se le pasa la peticion req para que pueda acceder a los datos que el cliente envio
/*    body('name') //body es para no asincrono y await es para asincrono
            .trim() // elimina espacios  "   texto   "  ->para luego validar que no este vacio "texto"
            .notEmpty().withMessage('El nombre de producto no puede ir vacio')
            .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
            
    body('price')
            .isNumeric().withMessage('Valor no valido')
            .notEmpty().withMessage('El precio de producto no puede ir vacio')
            //validacion personalizada para validar que el precio sea mayor a 0
            .custom((value) => value > 0).withMessage('El precio no valido, debe ser mayor a 0'),
*/         

    createProductValidation, //validacion de campos de product usando middleware
    handleInputErrors, //middleware de validacion de errors de campos
    createProduct
)   //router.post('/', (req, res) => { 


router.put('/:id', 
    //Validacion de data recibida en el Router - npm i express-validator
    productIdValidation,
    createProductValidation, ///Requerido para testing ya que la validacion con updateProductValidation es opcional, 
    updateProductValidation, //validacion de campos de product usando middleware
    handleInputErrors, //middleware de validacion de errors de campos
    updateProduct
)

router.patch('/:id',
    productIdValidation,
    //updateAvailabilityValidation, //no necesaria porque usa toogle, al hacer la peticion cambia de true o false no requiere enviar el valor en del campo availability
    handleInputErrors,
    updateAvailability);

router.delete('/:id',
    productIdValidation,
    handleInputErrors,
    deleteProduct);


export default router;