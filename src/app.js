const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')




const app = express()
const port = process.env.PORT || 3000;

// define path for express config

const PubliDirName = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// setup handlebar engine and view location

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath);
// setup static directory to serve
app.use(express.static(PubliDirName))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Shubhankit Goutam'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Shubhankit Goutam'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'this is helpful text',
        title: 'Help',
        name:'Shubhankit Goutam'
    })
})

 app.get('/Weather',(req,res)=>{ 
    
    if(!req.query.address){
        return res.send({
            error : 'Input the Location'
        })
    }
    
    geocode(req.query.address,(error, {laitude, longitude , location} = {})=>{
        if(error){
            return res.send({ error })
        }

        forecast(laitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast:forecastData,
                location,
                address : req.query.address
            })
        })
    })
    /* res.send({
        forecast:"It is showing ",
        Location:"Bijnor",
        address : req.query.address
    }); */
}) 

app.get('/product',(req,res)=>{
    if (!req.query.search) {
          return res.send({
            error:'You must providee a search term'
          })     
    }
    console.log(req.query.search);
    res.send({
        product : []
    })
})
    
  

 app.get('/help/*', (req,res)=>{
     res.render('404',{
         title: '404',
         name : 'shubhankit Goutam',
         ErrorMeassage : 'Help Article is not found'
     })
 })

 app.get('*',(req,res)=>{
     res.render('404',{
         title : '404',
         name : 'Shubhankit Goutam',
         ErrorMeassage : 'Page not found'
     }) 
 })

app.listen(port,()=>{
    console.log('server is up on port '+ port );
})