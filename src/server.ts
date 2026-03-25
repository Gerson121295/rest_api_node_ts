
import express from 'express'
import router from './router';
import db from './config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';

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

// Permitir Conexiones habilitando CORS
const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        //console.log(origin);  //verifica el origin de url que hace la peticion
        if(origin === process.env.FRONTEND_URL){
            //console.log('Permitir...')
            callback(null, true ) //callback recibe 2 parametros, el 1ro. por si hay error y el 2do. True Si se quiere permitir la conexion
        }else{
            //console.log('Denegar...')
            callback(new Error('Error de CORS'));
        }
    }
}

// cors se le envia las opciones definidas
server.use(cors(corsOptions));


// Leer datos de formulario. Use es un middleware que se ejecuta antes de llegar a las rutas, y permite leer los datos que se envian desde el cliente y express.json() es un middleware que se encarga de convertir los datos que se envian desde el cliente en formato JSON, para que puedan ser leidos por el servidor y utilizados en las rutas. Es importante colocar este middleware antes de las rutas, para que pueda leer los datos antes de que lleguen a las rutas. 
server.use(express.json()) //middleware para leer datos de formulario -express.json() ver data que envia el cliente en consola

//morgan middleware de registro(informacion) de solicitudes HTTP para Node.js
server.use(morgan('dev'));

//use prmite acceder a las rutas de router: GET: http://localhost:4000/api/products
server.use('/api/products', router);

//Ruta de prueba para verificar que el servidor esta funcionando
/*
server.get('/api', (req, res) => {
    res.json({msg: 'Desde api'})
})
*/

//Docs
server.use(
    '/docs',  //ruta para acceder a la documentación de la API: http://localhost:4000/docs
    swaggerUi.serve, //middleware para servir la documentación de la API
    swaggerUi.setup(swaggerSpec, swaggerUiOptions) //middleware para configurar la documentación de la API, se le pasa el objeto swaggerSpec que contiene la configuración de la documentación de la API
)

export default server;

