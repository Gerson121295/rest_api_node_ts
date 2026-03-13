import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";


const options : swaggerJSDoc.Options = {

    swaggerDefinition: {  //Información de la API
        openapi: "3.0.0", //Versión de OpenAPI que se está utilizando. En este caso, se está utilizando la versión 3.0.0 de OpenAPI.
        tags: [
            {
                name: "Products",
                description: "API Operations related to products"
            },
        ],
        info: {
            title: "REST API with Express and TypeScript",
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts'],
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions : SwaggerUiOptions = {
    // Para cambiar el favicon, usa customfavIcon, no customCss.
    customfavIcon: "https://images.pexels.com/photos/35758327/pexels-photo-35758327.jpeg",
    
    // customCss solo modifica estilos, usando las clases Css obtenidas al darle clic derecho a la pagina y seleccionar inspeccionar y elegir elemento y posicionar el mouse a modificar
    customCss: `
        .topbar-wrapper .link {
            content: url('https://www.svgrepo.com/show/530678/genetic-engineering.svg');
            height: 120px;
            width: auto;
        }
        .swagger-ui .topbar-wrapper {
            background-color: #6b94e6;
        }
    `,
    customSiteTitle: 'Documentacion REST API - Express & TypeScript'
}

export default swaggerSpec;
export { swaggerUiOptions };

