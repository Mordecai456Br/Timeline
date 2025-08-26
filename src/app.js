const express = require("express");
const app = express();
const eventRoutes = require("./routes/eventRoutes");

app.use(express.json());
app.use(eventRoutes);

app.listen(3000, () => {
    console.log('%c 🎉 Events Ahead! Server Running in http://localhost:3000', 'color: pink;')
});


