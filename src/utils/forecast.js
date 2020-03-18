const request = require("request");
const forecast = (latitude,longitude,callback)=>{
    const url = "https://api.darksky.net/forecast/79f1e94cf08b1fd66c3b62afa86de41f/"+latitude+","+longitude;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("you are not connected to the internet try again",undefined)
        }else if(body.error){
            callback("Unable to find location",undefined);
        }else{
            callback(undefined,body.daily.data[0].summary+" and it is currently temperature is" +
            body.daily.data[0].temperatureMin+ ' degrees out. and There is a ' + 
            body.daily.data[0].precipProbability +' % chance of rain and '+
             "the pressure is " + body.daily.data[0].pressure  
            )
        }
    }) 
}
module.exports=forecast;