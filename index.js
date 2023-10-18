const express = require("express");
const app = express();
require("dotenv").config();

const cors =require("cors")
const PORT = process.env.PORT
const userRoutes = require("./routes/User")
// const profileRoutes = require("./routes/Profile")

const database = require("./config/dbConnect");

//database connection
database.connect();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1", userRoutes);
// app.use("/api/v1", profileRoutes);

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})

app.get("/", (req, res) => {
    res.send(`<h1>Hello</h1>`)
})