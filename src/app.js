const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express();
const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Adam Boyer'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This the about page',
        name: 'Adam Boyer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help for the homies',
        msg: 'This is where i give you all the answers', 
        name:'Adam Boyer'
    })
})



app.get('/weather', (req, res) => {
   if(!req.query.address) {
       return res.send({
           error: 'You must provide an address'
       })
   }

   geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
       if(error){
           return res.send({
               error: error
           })
       }
       forecast(latitude, longitude, (error, forecastData) => {
           if(error){
               return res.send({
                   error: error
               })
           }
           res.send({
               forecast: forecastData,
               location: location,
               address: req.query.address

           })
       })
   })


})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Help article',
        name: 'Adam Boyer',
        title: 'Help 404'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        msg: 'Page',
        name: 'Adam Boyer',
        title: '404'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})