require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");
const app = express();


app.use(cors())
app.use(express.json());

app.use(morgan("dev"));

const port = process.env.PORT || 3001;
app.listen(port,() => {
    console.log(`server is up and listening and up on port ${port}`);
});