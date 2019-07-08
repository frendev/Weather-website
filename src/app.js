const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()
//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//set up handle bar engine and views location
app.set('view engine','hbs')
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))


//Route handlers
app.get('',(req,res)=>
{
    res.render('index',{
        title:'Weather App',
        name:'Adwait'
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        message:'this is about me',
        title:'Help',
        name:"Adwait"
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        message:'this is helpful text',
        title:'Help',
        name:"adwait"
    })
})



 
app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'Provide address'
        })
    }


    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
                return  res.send({
                    error:'Error processing request'
                })
        }
        
        forecast(latitude, longitude, (error, foreCastdata) => {
                if(error)
                {
                return res.send({error:error});
                }
                res.send({
                    forecast:foreCastdata,
                    location,
                    address:req.query.address,
                })
        })
})})



    // res.send({
    //         forecast:'rainy',
    //         location:'india',
    //         address:req.query.address
    //     }
        
    


app.get('/products',(req,res)=>{
    if(!req.query.search){
       return  res.send({error:'You must provide a search'})
    }
    // if(!res.query.search){
    //     res.send({
    //         error:'You must provide search term'
    //     })
    // }
    console.log(req.query.search);
    res.send({
           products:[]
        }
        
    );
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'page not found',
        name:'adwait',
        title:'404'
    });
})


app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'page not found',
        name:'adwait',
        title:'404'
    });
})


//Setting it on a web
app.listen(3000,()=>{
    console.log('server started on port 3000');
})




