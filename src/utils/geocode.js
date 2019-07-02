const request = require ( 'request')
const geocode = (address,callback) =>
{
    if(!address)
    {
        callback('Please enter a search term. Try another Search.', undefined)
    }
    else
    {
   const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibG91aWpvc2UiLCJhIjoiY2p3dWc3N2t2MGFvMDN5bW93dTQ0YnVhaiJ9.0CBMGA7LLZMfIEkpEPMEcg&limit=1'
   request({url, json : true},(error,{body}) => 
   {
      if(error) 
      {
         callback('Unable to connect to location services', undefined)
      }
      else if (body.features.length === 0)
      {
         callback('Unable to find location. Try another Search.', undefined)
      }
      else
      {
         callback(undefined,{
            latitude:  body.features[0].center[1],
            longitude: body.features[0].center[0],
           
            location: body.features[0].place_name
         })
      }
   })
}   
}

module.exports = geocode