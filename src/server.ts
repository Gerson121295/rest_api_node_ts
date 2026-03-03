
import express from 'express'
import router from './router';
import db from './config/db';
import colors from 'colors';

//Conectar a la DB PostGres
//async function connectDB() { //F1 - Normal functions
export const connectDB = async() => {  //F2-Arrow functions
    try {
        await db.authenticate()
        db.sync()  //sync al crear nuevas columnas las agrega a la DB
        //console.log(colors.blue('Conexion exitosa a la DB'))
        console.log(colors.bgGreen.bold('Conexion exitosa a la DB'))

    } catch (error) {
        console.log(error);
        //console.log(colors.bgRed.white('Hubo un error al conectarse a la DB'))
        console.log(colors.red.bold('Hubo un error al conectarse a la DB'))
    }
}

//LLama a la funcion que conecta a la DB
connectDB();

//Instancia de Express - Servidor
const server = express();

// Leer datos de formulario. Use es un middleware que se ejecuta antes de llegar a las rutas, y permite leer los datos que se envian desde el cliente y express.json() es un middleware que se encarga de convertir los datos que se envian desde el cliente en formato JSON, para que puedan ser leidos por el servidor y utilizados en las rutas. Es importante colocar este middleware antes de las rutas, para que pueda leer los datos antes de que lleguen a las rutas. 
server.use(express.json()) //middleware para leer datos de formulario -express.json() ver data que envia el cliente en consola


//use prmite acceder a las rutas de router: GET: http://localhost:4000/api/products
server.use('/api/products', router);

//Ruta de prueba para verificar que el servidor esta funcionando
server.get('/api', (req, res) => {
    res.json({msg: 'Desde api'})
})

export default server;

