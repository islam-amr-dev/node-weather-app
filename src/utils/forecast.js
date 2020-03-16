const request = require("request");
const forecast = (longitude,latitude,callback)=>{
    const url = "https://api.darksky.net/forecast/79f1e94cf08b1fd66c3b62afa86de41f/"+longitude+","+latitude;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("you are not connected to the internet try again",undefined)
        }else if(body.error){
            callback("Unable to find location",undefined);
        }else{
            callback(undefined,body.daily.data[0].summary+"it is currently" +
             body.currently.temperature + 'degrees out.There is a' + 
             body.currently.precipPorabability +'%chance of rain'
            )
        }
    }) 
}
module.exports=forecast;