const request=require('request')
const yargs=require('yargs')
const address=process.argv[2]; 
const weather=require('./web-server/src/utils/weather.js')

if(!address){
    console.log('Please provide an address');
}else{
    weather(address,(error,data)=>{
        if(error){
            return console.log(error);
        }
        console.log(data);
    })
}
