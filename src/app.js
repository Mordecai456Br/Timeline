const express = require("express");
const app = express();
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const fs = require('fs') ;
const swaggerFile = JSON.parse(fs.readFileSync('./swagger-output.json'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
    eventRoutes,
    userRoutes,
    commentRoutes);

app.listen(3000, () => {
    console.log('%c 🎉 Events Ahead! Server Running in http://localhost:3000', 'color: pink;')
});




