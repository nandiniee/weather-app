const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('./utils/weather.js');

// Define paths for Express config
const publicPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname, '../templates/views'); 
const partialsPath=path.join(__dirname, '../templates/partials');


const app=express();

// Set up handlebars engine and views location
app.set('views', viewsPath);  // set the views directory
app.set('view engine','hbs');


//set up static directory to serve
app.use(express.static(publicPath));

app.get('',(req,res)=>{
    res.render('index');
})

app.get('/weather-data',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    weather(req.query.address, (error, {weatherDesc, temp, feels} = {}) => {
        if (error) {
            return res.send({ error });
        }
        if (!weatherDesc || !temp || !feels) {
            return res.send({
                error: 'Unable to find weather for the provided address.'
            });
        }

        res.send( {
            location: req.query.address,
            date: new Date().toLocaleDateString(),
            day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
            temperature: temp,
            feelslike: feels,
            description: weatherDesc
        });
    });
    
})

app.get('/weather',(req,res)=>{
    res.render('weather');
})

// app.get('*',(req,res)=>{
//     res.send('404 Page Not Found');
// })

app.listen(3000,()=>{
    console.log("server is running");

})
