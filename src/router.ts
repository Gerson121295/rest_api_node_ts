import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";
import { createProductValidation, productIdValidation, updateAvailabilityValidation, updateProductValidation } from "./middleware/product.validation";
import { param } from "express-validator";

const router = Router();

//Swagger documentation for Product schema: Agregar: 2 espacios por nivel de indentación(NO USAR TAB).
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: Monitor
 *         price:
 *           type: number
 *           description: The product price
 *           example: 199.99
 *         availability:
 *           type: boolean
 *           description: Product availability
 *           example: true
 */


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Products
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */


//Routing
//cuando se visita la url / se envia la peticion req, y se resive la respuesta res
router.get('/', getProducts);


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *         - Products
 *     description: Return a single product by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The ID of the product to retrieve
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request - invalid ID supplied
 */

router.get('/:id',
    //validacion
    productIdValidation, //param('id').isInt().withMessage('ID no valido'),
    handleInputErrors, //middleware de validacion de errors de campos
    getProductById);
    

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *         - Products
 *     description: Return a new record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor Curvo 49p"
 *               price:
 *                 type: number
 *                 example: 500
 *     responses:
 *       201:
 *         description: Successful response 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - invalid input data
 */    

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



/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product with user input data
 *     tags:
 *       - Products
 *     description: Return the updated product record in the database
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The ID of the product to retrieve
 *       required: true
 *       schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor Curvo 49p"
 *               price:
 *                 type: number
 *                 example: 500
 *               availability:
 *                type: boolean
 *                example: true
 *     responses:
 *       200:
 *         description: Successful response - product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - invalid input data or invalid ID supplied
 *       404:
 *         description: Product not found
 */
router.put('/:id', 
    //Validacion de data recibida en el Router - npm i express-validator
    productIdValidation,
    createProductValidation, ///Requerido para testing ya que la validacion con updateProductValidation es opcional, 
    updateProductValidation, //validacion de campos de product usando middleware
    handleInputErrors, //middleware de validacion de errors de campos
    updateProduct
)


/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update the availability of a product
 *     tags:
 *       - Products
 *     description: Return the updated product record in the database
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The ID of the product to retrieve
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response - product availability updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - invalid input data or invalid ID supplied
 *       404:
 *         description: Product not found
 */
router.patch('/:id',
    productIdValidation,
    //updateAvailabilityValidation, //no necesaria porque usa toogle, al hacer la peticion cambia de true o false no requiere enviar el valor en del campo availability
    handleInputErrors,
    updateAvailability);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: 
 *       - Products
 *     description: Returns a message confirming the deletion of the product
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The ID of the product to delete
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response - product availability updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               value: Product with ID {id} deleted successfully
 *       400:
 *         description: Bad Request - invalid input data or invalid ID supplied
 *       404:
 *         description: Product not found
 */
router.delete('/:id',
    productIdValidation,
    handleInputErrors,
    deleteProduct);


export default router;