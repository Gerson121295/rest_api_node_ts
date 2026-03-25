
import { Request, Response } from 'express';
import Product from '../models/Product.model';

//Obtener todos los productos
export const getProducts = async(req: Request, res: Response) => {
try {
    //const products = await Product.findAll(); //findAll es un metodo de sequelize que devuelve todos los productos de la DB
    const products = await Product.findAll({
        order: [ //Para establecer orden al retornar los productos
            //['createdAt', 'DESC'] //Ordena los productos por fecha de creacion de forma descendente
            //['price', 'ASC'] //Ordena los productos por precio de forma ascendente
            ['id', 'DESC'] //Ordena los productos por id de forma descendente - ASC es por defecto, no es necesario ponerlo
        ],

        //Atributos que no se quieren mostrar al retornar los productos
        attributes: {
            exclude: ['createdAt', 'updatedAt'] //exclude: ['availability','createdAt', 'updatedAt'] //exclude es para excluir los campos createdAt y updatedAt al retornar los productos
        }
    }); 
    //se responde al cliente con un json que contiene los productos encontrados en la DB
     res.status(201).json({
        ok: true,
        data: products
      });
} catch (error) {
    console.log(error);
     res.status(500).json({
        ok: false,
        msg: 'Error al obtener los productos'
     })
}
}

//Obtener un producto por id
export const getProductById = async(req: Request, res: Response) => {
try {
   //console.log(req.params.id); //ver el id que el cliente envio en la peticion

   //const { id } = req.params; //desestructuracion del id que el cliente envio en la peticion

    const id = Number(req.params.id); // conversión segura del id a número, si no es un número se le asigna NaN
/*  //Validacion id debe ser un numero, si no es un numero se le responde al cliente con un status 400 y un mensaje de error
    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        msg: 'ID inválido'
      });
    } */

    const product = await Product.findByPk(id); //findByPk es un metodo de sequelize que devuelve un producto por su id
    

   if (!product) {
        return res.status(404).json({
            ok: false,
            msg: 'Producto no encontrado'
        })
    }

    res.json({
        ok: true,
        data: product
    })

} catch (error) {
    console.log(error);
     res.status(500).json({
        ok: false,
        msg: 'Error al obtener los productos'
     })
}
}


export const createProduct = async(req : Request, res : Response) => { //Se define el type de parametro: req, res

    //console.log(req.body); //ver el producto que el cliente envio en la peticion

    //Validacion de data recibida En el Handler o Controller - npm i express-validator
    //check se le pasa el nombre del campo que se quiere validar, luego se le encadena el metodo
    // notEmpty() para validar que el campo no este vacio, y con withMessage() se le pasa el mensaje de error 
    //que se quiere mostrar si la validacion falla, y por ultimo se le pasa la peticion req para que pueda acceder a los datos que el cliente envio
/*    await check('name')
            .trim() // elimina espacios  "   texto   "  ->para luego validar que no este vacio "texto"
            .notEmpty().withMessage('El nombre de producto no puede ir vacio')
            .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres')
            .run(req) 
    await check('price')
            .isNumeric().withMessage('Valor no valido')
            .notEmpty().withMessage('El precio de producto no puede ir vacio')
            //validacion personalizada para validar que el precio sea mayor a 0
            .custom((value) => value > 0).withMessage('El precio no valido, debe ser mayor a 0')
            .run(req) 

    //validationResult se le pasa la peticion req para que pueda acceder a los datos que el cliente envio y validar si hay errores
    let errors = validationResult(req) 

    //Si errores no esta vacio, es decir, si hay errores, se le responde al cliente con un status 400 y se le envia un json con los errores que se encontraron
    if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() })
    }

    // Creacion del producto
     const product = await Product.create(req.body)
     res.json({ data: product }) 
*/

    
    //Forma 1 - Crear Producto
/*    const product = new Product(req.body); //Se instacia un nuevo Product del modelo y se le asigna la data que el cliente envio
uct = await product.save();

    //almacenar el producto en la DB
    const savedProd
    //Respuesta del producto guardado en la DB
    res.json({data: savedProduct })
*/

try {
        //Forma 2 - Crear Producto     
        //Instancia el modelo Producto y llama al metodo create y se le pasa la data para crear el producto
        const product = await Product.create(req.body) 
        
        //Respuesta del producto guardado en la DB
        //res.json({ data: product }) 
        res.status(201).json({
        ok: true,
        data: product
      });
    } catch (error) {
        console.log(error);
    }

}


export const updateProduct = async(req: Request, res: Response) => {
    
    //validar que el producto exista en la DB
    const id = Number(req.params.id); // conversión segura del id a número, si no es un número se le asigna NaN

    const product = await Product.findByPk(id); //findByPk es un metodo de sequelize que devuelve un producto por su id
    

   if (!product) {
        return res.status(404).json({
            ok: false,
            msg: 'Producto no encontrado'
        })
    }

    try {
        //Actualizar el producto con la data que el cliente envio en la peticion
        await product.update(req.body); //update es un metodo de sequelize que actualiza el producto con la data que el cliente envio en la peticion, se le pasa la data que se quiere actualizar
        //await product.save(); //save es un metodo de sequelize que guarda el producto actualizado en la DB, se le llama despues de update para guardar los cambios en la DB

        //Respuesta del producto actualizado en la DB
        res.json({
            ok: true,
            data: product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el producto'
        })
    }
}

export const updateAvailability = async(req: Request, res: Response) => {

    //validar que el producto exista en la DB
    const id = Number(req.params.id); // conversión segura del id a número, si no es un número se le asigna NaN

    const product = await Product.findByPk(id); //findByPk es un metodo de sequelize que devuelve un producto por su id
    
   if (!product) {
        return res.status(404).json({
            ok: false,
            msg: 'Producto no encontrado'
        })
    }

    try {
        //Actualizar el campo availability del producto  - Usando PATCH para actualizar solo un campo del producto
        //product.availability = req.body.availability; //se le asigna el valor que el cliente envio en la peticion al campo availability del producto
        
        //se le asigna el valor contrario al campo availability del producto, si es true se le asigna false y viceversa, para actualizar la disponibilidad del producto sin necesidad de enviar un valor en la peticion
        product.availability = !product.availability;  // !product.dataValues.availability; 
        await product.save(); //save es un metodo de sequelize que guarda el producto actualizado en la DB, se le llama despues de update para guardar los cambios en la DB

        //await product.update({ availability: !product.availability }); //F2-

        //console.log(product.dataValues.availability); //ver el producto actualizado en la consola

        //Respuesta del producto actualizado en la DB
        res.json({
            ok: true,
            data: product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el producto'
        })
    }

}



export const deleteProduct = async(req: Request, res: Response) => {

    //validar que el producto exista en la DB
    const id = Number(req.params.id); // conversión segura del id a número, si no es un número se le asigna NaN

    const product = await Product.findByPk(id); //findByPk es un metodo de sequelize que devuelve un producto por su id
    
   if (!product) {
        return res.status(404).json({
            ok: false,
            msg: 'Producto no encontrado'
        })
    }

    try {
        
        await product.destroy(); //destroy es un metodo de sequelize que elimina el producto de la DB
    
        //Respuesta del producto actualizado en la DB
        res.json({
            ok: true,
            data: 'Producto eliminado correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el producto'
        })
    }

}


