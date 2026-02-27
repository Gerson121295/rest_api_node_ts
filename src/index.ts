import colors from 'colors';
import server from './server';

//Quien asigna el puerto al hacer el deployment es el servidor mediante la variable de entorno process.env.PORT
const port = process.env.PORT || 4000; //si el puerto no se asigna por la variable de entorno se establece el 4000

server.listen(port, () => {
    //colors permite agregar color al mensage a mostrar en consola
    console.log( colors.cyan.bold(`REST API en el puerto ${port}`));

});


