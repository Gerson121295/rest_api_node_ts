import { Sequelize } from 'sequelize-typescript';

import dotenv from 'dotenv'
import { join } from 'path';



//Colocar la conexion de la DB en variable de entorno - archivo .env
dotenv.config();

//Conexion a la DB PostGres
//En Sequelize se agrego la External Database URL generada de render.com de la DB PostGres
const db = new Sequelize(
    //F1 - Solucionar error de conexion, en la url agregar al final: ?ssl=true
    //'postgresql://rest_api_ts_user:3ZaZ-CONTRASEÑAsjxV1eCs@dpg-d6e7-HOST-icff0-a.oregon-postres.render.com/rest_DB_ts?ssl=true' 
    
    //F2 - Solucionar error de conexion, despues de la url agregar: ,{{ dialectOptions:{ssl: {require: false}}}  }
    //'postgresql://rest_api_ts_user:3ZaZ-CONTRASEÑAsjxV1eCs@dpg-d6e7-HOST-icff0-a.oregon-postres.render.com/rest_DB_ts',
    /* process.env.DATABASE_URL!, //variable de entorno que contiene la url de conexion a DB. EL ! garantiza que ese valor estará ahi
    { dialectOptions:{
       ssl: {
           require: false
       }
    }},   */
    
    //variable de entorno que contiene la url de conexion a DB con ssl. EL ! garantiza que ese valor estará ahi
    process.env.DATABASE_URL_SSL!, 

    //especifica donde encontrar los modelos para crear las columnas en la DB
    //__dirname brinda la ubicacion donde se esta llamanado, En este casos e llama dentro de config,
    // los  .. es para salir y entrar a carpeta models y seleccionar todos los archivo .ts como modelos
    {
        //models : [__dirname + '/../models/**.ts']        
        //models: [join(__dirname, '/../../models/**/*.ts')],
        models: [__dirname + '/../models/**/*.ts'],
        schema: 'public',
        logging: false, //desactiva los logs de sequelize en consola
    },

);

export default db;

