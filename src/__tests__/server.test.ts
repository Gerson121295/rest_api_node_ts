
/*
//Describe recibe 2 parámetros, el primero es la descripción del test, el 2do es una función del código del test
describe('Nuestro primer test', () => {
  
    //Usar test o it es para definir un test
    test('Revisar que 1+1 sea 2 ', () => {

        //expect(espero 1+1) to be (que el resultado sea 2)
        expect(1+1) //expect función recibe un valor y devuelve un objeto con métodos para hacer aserciones
        .toBe(2); //toBe es método de expect que compara el valor recibido con el valor esperado
    });

      test('Revisar que 1+1 no sea 3 ', () => {

        //expect(espero 1+1) to be (que el resultado no sea 3)
        expect(1+1) //expect función recibe un valor y devuelve un objeto con métodos para hacer aserciones
        .not.toBe(3); //not.toBe es método de expect que compara el valor recibido con el valor esperado
    });
});
*/

import request from 'supertest';
import server , {connectDB} from '../server';
import db from '../config/db';

/*
describe('Test de servidor GET/api', () => {

    test('should send back a json response', async () => {
        const response = await request(server).get('/api');
        console.log(response.body);

        //(expect)Espero response.status (toBe)sea 200
        expect(response.status).toBe(200);
        
        //verificar que el header content-type contenga json
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body).toEqual({msg: 'Desde api'}); //F1
        expect(response.body.msg).toEqual('Desde api');  //F2

        //status no debe ser 404
        expect(response.status).not.toBe(404);
        expect(response.body.msg).not.toBe('DESDE API');  
    });

})
*/


//Forzar que falle la conexion a la DB usando Mocking de Jest

jest.mock('../config/db')

describe('Connect DB', () => {
    test('should handle database connection error', async () => {

        //Simular que la función authenticate de db lanza un error
        jest.spyOn(db, 'authenticate') //pasa la db y el metodo authenticate para espiar su comportamiento
            //mockRejectedValue simula que la función lanza un error, se le pasa el error que se quiere simular
            .mockRejectedValue(new Error('Hubo un error al conectarse a la DB')); //forzar un error para que caiga en el catch de la función connectDB

        //Llamar a la función connectDB para que se ejecute el código y se capture el error
        const consoleSpy = jest.spyOn(console, 'log'); //espiar el comportamiento de console.log para verificar que se imprima el mensaje de error
        await connectDB(); //esperar a que se ejecute la función connectDB

        //Verificar que se haya llamado a console.log con el mensaje de error esperado
        expect(consoleSpy)
            .toHaveBeenCalledWith(
                expect.stringContaining('Hubo un error al conectarse a la DB')
            ); //verificar que se haya llamado a console.log con un mensaje que contenga 'Hubo un error al conectarse a la DB'
    
    })

});



