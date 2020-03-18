const request = require ("request");
const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaXNsYW10YWViIiwiYSI6ImNrNndpYmV1MDBieWwzZXF2OGh1NXZkamoifQ.NsPfJokU6qSJBgllWoDMZA";
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to  location services",undefined);
        }else if(body.features.length === 0){
            callback("un able to find location .Try another one .",undefined);
        }else{
            callback(undefined,{
                latitude: body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
} 

module.exports=geocode;