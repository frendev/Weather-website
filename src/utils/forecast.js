const request=require('request')




const forecast=(lat,long,callback)=>{

    const url='https://api.darksky.net/forecast/4ef148b48e28c7eafb33473d3a7b185f/'+lat+','+long+'?units=si'

    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Network Error',undefined)
        }
        else if(body.error)
        {
            callback(body.error,undefined)
        }
        else
        {
            callback(undefined,'It is currently '+body.currently.temperature+ ' degrees.There is a '+body.currently.precipProbability+' % of rain')
        }
    })
}    


module.exports=forecast