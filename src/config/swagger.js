const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness Planner API',
      version: '1.0.0',
      description: 'Coach-Client Fitness Planner API',
    },
    servers: [
      {
        url: 'https://fitness-planner-backend-vtk7.onrender.com/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/features/**/*.js'], // scan all feature files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;