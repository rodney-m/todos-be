
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


const app = express();

app.use(cors({
    origin: '*'
}));


// Middleware
app.use(express.json());
app.use(morgan('tiny'));


//routes

const todosRoutes = require('./routes/todo')

const api = process.env.API_URL;
app.use(`${api}/todos`, todosRoutes);


// console.log("connection string ",process.env.CONNECTION_STRING)
// database
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Database connection is ready');
})
.catch((err) => {
    console.log(err)
})

// server


app.listen(5000, () => {
    console.log("listening on PORT 5000")
})

