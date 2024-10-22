import swaggerJSDoc, { OAS3Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mi API',
    version: '1.0.0',
    description: 'Documentación de mi API usando Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3100',
    },
  ],
};

const options: OAS3Options = {
  swaggerDefinition,
  apis: ['./routes/*.ts'], 
  

};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerSpec;
