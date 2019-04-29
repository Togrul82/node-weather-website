request = require('request') 
util = require('./util') 
express = require('express')
app = express()

myprint=(data)=>{
    console.log(data)
}

getWeatherByLocation = (location, callback)=>{
    const url ='https://api.opencagedata.com/geocode/v1/json?q=' + location + '&key=ee0356acbe00452da055082110e97714'
        
    request({url, json:true},(error, data)=>{
        if(error)
            return callback({err_message:'server connection fail'})
        if(data.body.results.length === 0)
            return callback({query: location, err_message:'Not any result'})
        if(data.body.results.length > 0){
            loc_name = data.body.results[0].formatted
            latlng = data.body.results[0].geometry
                 
            getForcast({loc_name, latlng}, callback) 
        }
    
    })    
}


getWeatherBySearch=(search_text, callback)=>{
    url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + search_text + '.json?access_token=pk.eyJ1IjoidG9ncnVsODIiLCJhIjoiY2p1dXNlOXBqMG00bDRkbjdnYW92NXozcyJ9.M5IQF5aZRKkIeNH7FHKIIw&limit=1'
    
    request({url,json:true},(error, data)=>{
       if(error) return callback({err_message:'server connection fail'})
       
       body = data.body 
       results = body.features

       if(results.length === 0) return callback({query:search_text, err_message:'Not any result'})
        
        let loc_name = results[0].place_name 
        let lnglat = results[0].center
        latlng ={
           lat: lnglat[1],
           lng: lnglat[0]} 
    
        getForcast({loc_name, latlng}, callback) 
      
      
        
    })
        
}

//getWeatherByLocation('baku', myprint)

//getWeatherBySearch('Moscow domodedovo', myprint)

module.exports={
    getWeatherByLocation,
    getWeatherBySearch
}

 



 



 





   

    

   
   

    

