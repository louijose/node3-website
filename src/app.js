const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
 const forecast = require ('./utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app  = express()
const port = process.env.PORT || 3000

// Deinfe paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const rootDir = __dirname;
const viewsPath = path.join(rootDir, '../templates/views')
const partialPath = path.join(rootDir, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
//Setup static directory to use
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Jose Loui'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About ',
        name:'DogeMedia'
    })
})
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })
app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        message:'Please contact desk support',
        name: 'jose'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address
    if(!address){
        return res.send({
            error: ' You must provide an address'
        })
    }
    geocode(address, (error,{ latitude, longitude , location } = {}) =>{
        if (error){
           return res.send( {error})
        }
        //data.latitude, data.longitude
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error)
            {
                return res.send({ error })
            }
            res.send({
                location: location,
                forecast: forecastdata,
                address: req.query.address
            })
              
             
           })
     })
   
    // res.send({
    //     location: 'kochi',
    //     forecast: 'Chance of rain in the evening.',
    //     address: req.query.address
    // })
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
                error: 'You must provide search term'
            })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req, res) =>{
    res.render('404',
    {
        title:'Help article not found',
        name: 'Jose',
        error:'Help article not found'
    })

})
app.get('*',(req,res) =>{
    res.render('404',{
    title:'My 404 page',
    name: ' Jose',
    error:'Page not found'})
})
app.listen(port, () => {
    console.log('Server is up and running' + port)
})

// app.get('', (req, res) => {
//    res.send('<h1>Weather</h1>')
// })
// app.get ('/help',(req,res) => {
//     res.send([{
//         name: 'jose',
//         age: 22
//     },{
//         name: 'john',
//         age: 21
//     }])
// })