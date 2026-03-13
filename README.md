

# API REST Administrador de Productos 

## 📋 Descripción

Sistema completo de administración de productos desarrollado con la stack PERN (PostgreSQL, Express, Node.js, React) utilizando TypeScript. Proporciona una API REST robusta en el backend y una interfaz de usuario moderna en el frontend.

## 🚀 Tecnologías

**Backend:**
- Node.js
- Express.js
- TypeScript
- PostgreSQL

**Frontend:**
- React
- TypeScript

## 📦 Instalación

```bash
git clone https://github.com/Gerson121295/rest_api_node_ts.git
cd rest_api_node_ts
```

## ✨ Características

- CRUD completo de productos
- API REST con autenticación
- Base de datos relacional con PostgreSQL
- Interfaz responsiva y moderna
- Tipado fuerte con TypeScript

## 📝 Licencia

Este proyecto es parte del curso "React y TypeScript - La Guía Completa" de Udemy.



## 🧪 Pruebas con Jest

Se implementaron pruebas automatizadas para la API utilizando Jest y Supertest.

### Instalación de dependencias

```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
npx ts-jest config:init
```

### Configuración

- Crear la carpeta `__tests__` dentro de `src` para ubicar los archivos de prueba.
- Ejemplo de archivo de prueba: `src/__tests__/server.test.ts`.
- En el archivo `package.json`, agregar el script para ejecutar las pruebas:

```json
"scripts": {
    "test": "jest",
    "pretest": "ts-node ./src/data",
    "test:coverage": "npm run pretest && jest --detectOpenHandles --coverage"
}
```

- El script `pretest` limpia la base de datos antes de ejecutar las pruebas.
- Para ejecutar las pruebas:

```bash
npm test
```

- Para obtener métricas de cobertura:

```bash
npm run test:coverage
```

- Los resultados de cobertura indican las líneas no cubiertas por las pruebas.

### Métricas de cobertura

- <60%: Insuficiente
- 60%-80%: Mejorable
- >=80%: Buena cobertura
- 100%: Ideal

---

## 📚 Documentación con Swagger

Se documentó la API utilizando Swagger para facilitar la visualización y prueba de los endpoints.

### Instalación de dependencias

```bash
npm install swagger-jsdoc swagger-ui-express
npm install --save-dev @types/swagger-jsdoc @types/swagger-ui-express
```

### Configuración

- Integrar Swagger en el servidor Express para generar y mostrar la documentación.
- Acceder a la documentación desde la ruta `/api-docs` en el servidor.

---


