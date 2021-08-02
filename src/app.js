const path = require("path")
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast');
const { localsAsTemplateData } = require("hbs");

const app = express();

// define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engins and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather site',
        message: 'welcome to my weather site',
        name: " ياسين زيتوني"
    })

})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about ',
        message: "about me:",
    })

})


app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send("erreur : You must provide an adress!");
    }
    geoCode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, { name, description, temp } = {}) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                adress: req.query.adress,
                location,
                forecast: description,
                temp: temp
            })

        })

    })

})



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help ',
        message: "this is the help page"
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', { message: "help article not found!" })
})

app.get('*', (req, res) => {
    res.render('error', { message: "page article not found!" })
})


app.listen(3000, () => {
    console.log('server is running!');
})