const request = require('postman-request');



const forecast = (laitude, longitude ,callback)=>{
    const url =   'http://api.weatherstack.com/current?access_key=63c7d628523c487d4f73fd9fa4d6aa09&query=' + laitude + ' , ' + longitude + '&units=f'
    request({url , json : true},(error, {body})=>{
       if(error){
         callback('Unable to connect weather service!', undefined)
       }else if(body.error){
       callback('Unable to find location', undefined)
       } else{
       console.log(body.location.localtime + '& ' + body.current.weather_icons);
       callback(undefined,body.current.weather_descriptions[0] + ". it is currently "+ body.current.temperature + " degress out. it is feels like "+ body.current.feelslike + " % degress out. The humidity is "+ body.current.humidity + "%")
       }
     }) 
  }
  
  module.exports =forecast; 