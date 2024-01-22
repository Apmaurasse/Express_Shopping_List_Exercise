const express = require('express');

const ExpressError = require("./expressError")

const middleware = require("./middleware")

const morgan = require('morgan')

const itemRoutes= require("./itemRoutes")


const app = express();

app.use(express.json());


app.use(morgan('dev'));


app.use('/items', itemRoutes)




app.get('/', (req, res) =>{
    res.send("HOMEPAGE!")
})





app.use((req, res, next) =>{
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
});



module.exports = app;