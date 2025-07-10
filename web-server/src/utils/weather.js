const request = require('request');
const weather=(address,callback)=>{
    const url='https://api.weatherstack.com/current?access_key=5cdc80dcbdc89c4fd67dc7fc8a7212d1&query='+address+'&units=m'
request({url:url,json:true},(error,{body})=>{
   if(body.success){
     console.log(body);
    const{temperature,feelslike,weather_descriptions}=body.current;
    if(error){
        callback('Unale to connect to the weather service!',undefined)
    }
    else if(body.error){
        callback('Unable to find location. Try another search.',undefined)
    }
    else{

        callback(undefined,{weatherDesc: weather_descriptions[0], 
            temp:temperature, 
            feels:feelslike})
    }
   }
   else{
    console.error("Error fetching weather data:", body.error.info);
   }
})
}
module.exports=weather;