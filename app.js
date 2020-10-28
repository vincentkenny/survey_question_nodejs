const express = require('express');
const app = express();
const db = require("./models");
const bodyParser = require('body-parser');

const detailsRoutes = require('./api/routes/details');
const optionsRoutes = require('./api/routes/options')

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With. Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/details',detailsRoutes);
app.use('/options',optionsRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message,
            url: 'http://localhost:3000/details'
        
        }
    });
});

module.exports = app;