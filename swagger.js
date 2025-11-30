const swaggerAutogen = require('swagger-autogen');

const doc = {
  info: {
    title: 'API Docs Automática',
    version: '1.0.0',
  },
};

const output = './swagger-output.json';
const endpoints = ['./src/app.js', './src/routes/*.js'];

swaggerAutogen()(output, endpoints, doc);
