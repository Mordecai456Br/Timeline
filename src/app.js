const express = require("express");
const app = express();
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(eventRoutes);
app.use(userRoutes);

app.listen(3000, () => {
    console.log('%c 🎉 Events Ahead! Server Running in http://localhost:3000', 'color: pink;')
});


