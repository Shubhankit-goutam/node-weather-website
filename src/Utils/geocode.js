const request = require('postman-request');
const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+  address  +'.json?access_token=pk.eyJ1Ijoic2h1YmhhbmtpdCIsImEiOiJja2huOW96emIwOWJsMnBwbmM3dzk5M3Q5In0.uUT2PW7Xlz0toXSN5iWhIg'
    request({ url, json:true },(error, {body})=>{
        if(error){
          callback('Unable to connect Forcast service', undefined);
        }else if(body.features.length === 0 ){
          callback('unable to find location plz try another search', undefined);
        }else {
          callback(undefined,{
             laitude : body.features[0].center[0],
       
            longitude : body.features[0].center[1],
    
             location : body.features[0].place_name
          })
        }
      })
    
    }
    

    module.exports = geocode