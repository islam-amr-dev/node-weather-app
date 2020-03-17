const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath  = path.join(__dirname,'../templates/partials')
const publicDirectoryPath =path.join(__dirname,'../public')
const port = process.env.PORT || 3000;
const app =express();

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'islam amr'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'islam amr'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'islam amr'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        
        return res.send({
            error:"no address is porvided"
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({error})
        }
       forecast(longitude,latitude,(error,forecastData)=>{
           if(error){
               return res.send({error})
           }
           res.send({
            forecast:  forecastData,
            location,
            address:req.query.address
        })
       })
    })
    
})
app.get('/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"islam amr",
        errormessage:"page not found"
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        helpText:"some help data",
        name:"help article not found"
    })
})
app.listen(port);



/*const address= process.argv[2] 
const geocode = require("./utils/geocode");
const forecast= require("./utils/forecast");


if(!address){
    return console.log("enter a place to get information ya haywan");
}else{
    geocode(address,(err,{longitude,latitude,location})=>{
        if(err){
            return console.log(err);
        }
            forecast(longitude,latitude,(err,forcastdata)=>{
                if(err){
                    return console.log(err);
                }
                console.log(location);
                console.log(forcastdata);
                
            })
        
    })
    
}*/
