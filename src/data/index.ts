
import { exit } from 'node:process';
import db from '../config/db';

//Codigo que limpia la DB luego de realizar las pruebas, para evitar que los datos de las pruebas afecten a otras pruebas o al entorno de desarrollo

const clearDB = async () => {
    try {
        await db.sync({ force: true }); //force: true elimina todas las tablas y las vuelve a crear, lo que limpia la DB
        console.log('Database cleared successfully');
        exit(0); //exit cierra el proceso, 0 indica que todo salió bien
    } catch (error) {
        console.log(error)
        exit(1); //exit cierra el proceso y agregar 1 indicar que hubo un error, 0 indica que todo salió bien 
        
    }

}

//LLama la funcion clearDB si se pasa el argumento --clear al ejecutar el script, esto permite limpiar la DB solo cuando se necesite, evitando limpiar la DB cada vez que se ejecuten las pruebas
//process.argv se ejecuta desde CLI  2 es la posicion del argumento que se pasa al ejecutar el script, en este caso se espera que se pase --clear para ejecutar la función clearDB
if(process.argv[2] === '--clear') { //process.argv es un array que contiene los argumentos que se pasan al ejecutar el script, en este caso se espera que se pase --clear para ejecutar la función clearDB
    clearDB();
}

//console.log(process.argv); //imprime los argumentos que se pasan al ejecutar el script, esto es útil para verificar que se está pasando el argumento correcto para limpiar la DB
