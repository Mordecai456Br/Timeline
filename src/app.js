const express = require("express");
const app = express();
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use(express.json());
app.use(
    eventRoutes,
    userRoutes,
    commentRoutes);

app.listen(3000, () => {
    console.log('%c 🎉 Events Ahead! Server Running in http://localhost:3000', 'color: pink;')
});


