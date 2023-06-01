const path = require("path");
const express = require('express');
const helmet = require('helmet');
const mongoose = require("mongoose");
// require("dotenv").config();
const morgan = require("morgan");
const cors = require('cors');
const bookRoutes = require('./bookRoutes');
const app = express();

/////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet())

const port = 3000;

app.use(express.json());

// Use the book management routes
app.use('/home', bookRoutes);


// Connect to MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/booksData")
    //"mongodb://127.0.0.1:27017/booksData"
    .then(() => {
        app.listen(9000, () => {
            console.log(`Server Running on port 9000`);
        });
    })
    .catch((err) => console.log(err));



