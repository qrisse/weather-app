const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()

// Define paths foe Express config
const public = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(public))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Roffe Rost'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Roffe Rost'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'Some help would be nice',
        name: 'Roffe Rost'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error) {
            return res.send({error})
        } 
        
        forecast(latitude,longitude,(error,data)=>{
            if (error) return res.send({error})
               
            return res.send({
                location,
                forecast: data,
                address: req.query.address
            })   
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404 not found',
        message: 'Help page not found',
        name: 'Roffe Rost'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404 not found',
        message: 'Page not found',
        name: 'Roffe Rost'
    })
}) 

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})