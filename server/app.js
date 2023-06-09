require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectToDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

connectToDB();
app.use("/", userRoutes);    //we used here use coz when we write .use thn u can print the http method get, post, etc.

module.exports = app;