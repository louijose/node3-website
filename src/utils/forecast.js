const request = require ('request')
const forecast = ( latitude, longitude ,callback) => //lat,long
{
    const url = 'https://api.darksky.net/forecast/bc589f1f2eda2a6ee9531e8049e67772/'+ latitude +','+ longitude
    request({url , json :true}, (error, {body}) =>{
        if(error) 
      {
         callback('Unable to connect to location services', undefined)
      }
      else if (body.error)
      {
         callback('Unable to find location. Try another Search.', undefined)
      }

      else
      {
        callback(undefined,body.daily.data[0].summary +'It is currently '+ body.currently.temperature + ' degrees out. There is a '+ body.currently.precipIntensity +'% chance of rain.The peak temperature for today will be ' + body.daily.data[0].temperatureHigh + ' and minimum will be ' + body.daily.data[0].temperatureLow)
      }
    })
}

module.exports = forecast