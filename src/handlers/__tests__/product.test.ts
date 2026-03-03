import request from 'supertest';
import server from "../../server";

describe('Create Produt - POST /api/products', () => {

    it('should display validation errors', async () => {

        const response = await request(server)
             .post('/api/products') //endpoint para crear un producto
            .send({ 
                //data del producto a crear vacio, simula que va vacio
            });
        
            expect(response.status).toBe(400); //verifica que el código de estado sea 400 (Bad Request)
            expect(response.body).toHaveProperty('errors'); //verifica que la respuesta tenga una propiedad 'error'
            //expect(response.body.errors.length).toBeGreaterThan(0); //verifica que el array de errores tenga al menos un error
            //expect(response.body.errors).toHaveLength(4); 

            //Validacion de la contraparte:
            expect(response.status).not.toBe(404); //verifica que el código de estado no sea 201 (Created)
            expect(response.body.errors).not.toHaveLength(2); 
    });

        it('should validate that the price is greater than 0', async () => {

        const response = await request(server)
             .post('/api/products') //endpoint para crear un producto
            .send({ 
                name: 'Monitor Curvo-Testing',
                price: 0
            });
        
            expect(response.status).toBe(400); //verifica que el código de estado sea 400 (Bad Request)
            expect(response.body).toHaveProperty('errors'); //verifica que la respuesta tenga una propiedad 'error'
            //expect(response.body.errors.length).toBeGreaterThan(0); //verifica que el array de errores tenga al menos un error
            expect(response.body.errors).toHaveLength(1);  //Espera 1 mensaje de error específico para el precio

            //Validacion de la contraparte:
            expect(response.status).not.toBe(404); //verifica que el código de estado no sea 201 (Created)
            expect(response.body.errors).not.toHaveLength(2); 
    });


        it('should validate that the price is a number and greater than 0', async () => {

        const response = await request(server)
             .post('/api/products') //endpoint para crear un producto
            .send({ 
                name: 'Monitor Curvo-Testing',
                price: 'Hola'
            });
        
            //Esperamos los errrores y cuantos errores esperamos
            expect(response.status).toBe(400); //verifica que el código de estado sea 400 (Bad Request)
            expect(response.body).toHaveProperty('errors'); //verifica que la respuesta tenga una propiedad 'error'
            //expect(response.body.errors.length).toBeGreaterThan(0); //verifica que el array de errores tenga al menos un error
            expect(response.body.errors).toHaveLength(2);  //Espera 1 mensaje de error específico para el precio

            //Validacion de la contraparte:
            expect(response.status).not.toBe(404); //verifica que el código de estado no sea 201 (Created)
            expect(response.body.errors).not.toHaveLength(4); 
    });


    it('should create a new product', async () => {
        
        const response = await request(server)  //utiliza supertest para hacer una solicitud HTTP al servidor
            .post('/api/products') //endpoint para crear un producto
            .send({ //data del producto a crear
                name: 'Mouse-Testing',
                price: 19.99
            });

        //experamos que el status sea 201
        expect(response.status).toBe(201); //verifica que el código de estado sea 201 (Created)
        expect(response.status).toEqual(201); 
        //expect(response.body).toHaveProperty('id');//verifica que la respuesta tenga una propiedad 'id'
        expect(response.body).toHaveProperty('data');

        //No sea 
        expect(response.status).not.toBe(400); //verifica que el código de estado no sea 400 (Bad Request)
        expect(response.status).not.toBe(404); 
        expect(response.status).not.toBe(200); 
        expect(response.status).not.toBe(500); 
        expect(response.body).not.toHaveProperty('errors'); //verifica que la respuesta no tenga una propiedad 'error'
        
        
        });
});

describe('Get Products - GET /api/products', () => {

    it('should check if api/products url exists', async () => {
        const response = await request(server)
            .get('/api/products'); //endpoint para obtener productos
        expect(response.status).not.toBe(404); //verifica que el código de estado no sea 404 (Not Found)
    });


    it('GET a JSON response with products', async () => {
        const response = await request(server)
            .get('/api/products'); //endpoint para obtener productos

        //esperamos que el status sea 200 y el tipo de contenido sea JSON
        expect(response.status).toBe(201); //verifica que el código de estado sea 200 (OK)
        expect(response.headers['content-type']).toMatch(/json/);   //(/application\/json/); //verifica que el tipo de contenido sea JSON
        expect(response.body).toHaveProperty('data'); //verifica que la respuesta tenga una propiedad 'data'
        expect(response.body.data).toHaveLength(1); //verifica que el array de productos tenga al menos un producto

        //Validacion de la contraparte(lo que no se espera) que no sea 400, 404, 201, 500 y que no tenga errores:
        expect(response.status).not.toBe(400); //verifica que el código de estado no sea 400 (Bad Request)
        expect(response.status).not.toBe(404); 
        expect(response.status).not.toBe(500); 
        expect(response.body).not.toHaveProperty('errors'); //verifica que la respuesta no tenga una propiedad 'error'
    });
});

describe('Get Product by ID - GET /api/products/:id', () => {

    it('should return a 404 response for a non-existent product', async () => {

        const productId = 2000; //ID de un producto que no existe en la base de datos
        const response = await request(server)
            .get(`/api/products/${productId}`);

        expect(response.status).toBe(404); //verifica que el código de estado sea 404 (Not Found)
        expect(response.body).toHaveProperty('msg');
        //expect(response.body).toHaveProperty('error');
        expect(response.body.msg).toBe('Producto no encontrado'); //verifica que el mensaje de error sea 'Producto no encontrado'

     });

     it('should check a valid ID in the URL', async () => {

        const response = await request(server)
            .get('/api/products/not-valid-url'); //ID de un producto que existe en la base de datos

        expect(response.status).toBe(400); //verifica que el código de estado sea 400 (Bad Request)
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1); //verifica que el array de errores tenga al menos un error
        expect(response.body.errors[0].msg).toBe('El ID debe ser un numero entero positivo'); //verifica que el mensaje de error sea 'ID inválido'
     });

    
     it('Get a JSON response for a single product', async () => {

        const response = await request(server)
            .get('/api/products/1'); //ID de un producto que existe en la base de datos

        expect(response.status).toBe(200); //verifica que el código de estado sea 200 (OK)
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
    });
});


describe('PUT /api/products/:id', () => {

     it('should check a valid ID in the URL', async () => {

        const response = await request(server)
            .put('/api/products/not-valid-url') //endpoint no valido para actualizar producto
            .send({ 
                //Actualizacion precio negativo
                "name": "monitor curvo 32 pulgadas",
                "price": 3000,
                "availability": true
             });

        expect(response.status).toBe(400); //verifica que el código de estado sea 400 (Bad Request)
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1); //verifica que el array de errores tenga al menos un error
        expect(response.body.errors[0].msg).toBe('El ID debe ser un numero entero positivo'); //verifica que el mensaje de error sea 'ID inválido'
     });


    it('should display validation error messages when updating a product', async () => {

            const response = await request(server)
            .put('/api/products/1') //endpoint para actualizar un producto
            .send({ 
                //Actualizacion vacio, simula que va vacio
             });

            expect(response.status).toBe(400); //verifica que el código de estado sea 400 (Bad Request)
            expect(response.body).toHaveProperty('errors');
            expect(response.body.errors).toBeTruthy(); //verifica que el array de errores tenga al menos un error
            expect(response.body.errors).toHaveLength(7); //verifica que el array de errores tenga 5 errores

            expect(response.status).not.toBe(200); 
            expect(response.body).not.toHaveProperty('data');

    })

        it('should validate that the price is greater than 0', async () => {

            const response = await request(server)
            .put('/api/products/1') //endpoint para actualizar un producto
            .send({ 
                //Actualizacion precio negativo
                "name": "monitor curvo 32 pulgadas",
                "price": -3000,
                "availability": true
             });

            expect(response.status).toBe(400); //verifica que el código de estado sea 400 (Bad Request)
            expect(response.body).toHaveProperty('errors');
            expect(response.body.errors).toBeTruthy(); //verifica que el array de errores tenga al menos un error
            expect(response.body.errors).toHaveLength(2); //verifica que el array de errores tenga 5 errores
            expect(response.body.errors[0].msg).toBe('El precio no valido, debe ser mayor a 0'); //verifica que el mensaje de error sea 'El precio no valido, debe ser mayor a 0'

            expect(response.status).not.toBe(200); 
            expect(response.body).not.toHaveProperty('data');

    })


     it('should return a 404 response for a non-existent product', async () => {

            const productId = 5000; //ID de un producto que no existe en la base de datos
                const response = await request(server)
            .put(`/api/products/${productId}`) //endpoint para actualizar un producto
            .send({ 
                //Actualizacion con data de producto correctamente
                "name": "monitor curvo 32 pulgadas",
                "price": 1000,
                "availability": true
             });

            expect(response.status).toBe(404); //verifica que el código de estado sea 404 (Not Found)
            expect(response.body).toHaveProperty('msg');
            expect(response.body.msg).toBe('Producto no encontrado');

            expect(response.status).not.toBe(200); 
            expect(response.body).not.toHaveProperty('data');

    })

       it('should update an existing product with valid data', async () => {

            const productId = 1; //ID de un producto que no existe en la base de datos
                const response = await request(server)
            .put(`/api/products/${productId}`) //endpoint para actualizar un producto
            .send({ 
                //Actualizacion con data de producto correctamente
                "name": "monitor curvo 32 pulgadas",
                "price": 1000,
                "availability": true
             });

            expect(response.status).toBe(200); //verifica que el código de estado sea 404 (Not Found)
            expect(response.body).toHaveProperty('data');

            //Esperamos que no tenga errores ni mensajes de error
            expect(response.body).not.toHaveProperty('msg');
            expect(response.body.msg).not.toBe('Producto no encontrado');

            expect(response.status).not.toBe(404); 

    })


})


describe('PATCH /api/products/:id', () => {

    it('should check a valid ID in the URL', async () => {

        const response = await request(server)
            .patch('/api/products/not-valid-url'); //ID de un producto que existe en la base de datos
        expect(response.status).toBe(400); //verifica que el código de estado sea 400 (Bad Request)
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('El ID debe ser un numero entero positivo'); //verifica que el mensaje de error sea 'ID inválido'
    }); 

     it('should return a 404 for a non-existent product', async () => {

        const response = await request(server)
            .patch('/api/products/2000'); //ID de un producto que existe en la base de datos

        expect(response.status).toBe(404); //verifica que el código de estado sea 404 (Not Found)
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe('Producto no encontrado');

        //Lo que no se espera
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
     
    }); 

    it('should update the availability of an existing product', async () => {

        const response = await request(server)
            .patch('/api/products/1'); //ID de un producto que existe en la base de datos

        expect(response.status).toBe(200); //verifica que el código de estado sea 200 (OK)
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('availability');
        expect(response.body.data.availability).toBe(false); //verifica que el campo availability se haya actualizado a false

        //Lo que no se espera
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('msg');
    });

});


describe('DELETE /api/products/:id', () => {

     it('should check a valid ID in the URL', async () => {
        const response = await request(server)
            .delete('/api/products/not-valid-url'); //ID de un producto que existe en la base de datos

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('El ID debe ser un numero entero positivo');

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
     });


     it('should return a 404 response for a non-existent product', async () => {
        const productId = 5000; //ID de un producto que no existe en la base de datos
        const response = await request(server)
            .delete(`/api/products/${productId}`); //endpoint para eliminar un producto

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe('Producto no encontrado');
     });

     it('should delete an existing product', async () => {
        const productId = 1; //ID de un producto que existe en la base de datos
        const response = await request(server)
            .delete(`/api/products/${productId}`); //endpoint para eliminar un producto

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBe('Producto eliminado correctamente');

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
     });
    });

