const request = require('request');
const weather=(address,callback)=>{
    console.log(address);
    
    const url='https://api.weatherstack.com/current?access_key=dcee5e90820b6cb4b93ceaea1b1fad15&query='+address+'&units=m'
request({url:url,json:true},(error,{body})=>{
    console.log(body);
    
    if(error){
        callback('Unale to connect to the weather service!',undefined)
    }
    else if(body.error){
        callback('Unable to find location. Try another search.',undefined)
    }
    else{
        const{temperature,feelslike,weather_descriptions}=body.current;
        callback(undefined,{weatherDesc: weather_descriptions[0], 
            temp:temperature, 
            feels:feelslike})
        
    }

})
}
module.exports=weather;