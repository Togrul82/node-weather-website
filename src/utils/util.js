request = require('request') 


getForcast=(location, callback)=>{
    latlng = location.latlng
    lat = latlng.lat
    lng = latlng.lng
    url ='https://api.darksky.net/forecast/bad603ec46ccec765a425715918122b0/' + lat + ',' + lng + '?exclude=hourly,flags,daily&units=si'  //&lang=az - to change report language
       
    request({url, json:true},(error,data) =>{
             
        if(error)   return callback({err_message:'server connection fail'})
        body = data.body
        if(body.error)  return callback({location, error:body.error}) 
        
        deg = ' ' + String.fromCharCode(176) + 'C'   
        var {timezone, currently} = body //get var-s from data object 
        var{summary, temperature, windSpeed} = currently // get var-s from currently object
        temperature = temperature + deg
        windSpeed = windSpeed + ' m/s' 
        loc_name = location.loc_name
        
        return callback({location, timezone, summary, temperature, windSpeed })    
    })
}


module.exports = getForcast
 

