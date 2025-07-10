
const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const temperature=document.querySelector('#temperature');
const feelsLike=document.querySelector('#feelslike');
const wDescipt=document.querySelector('#desc');
const address=document.querySelector('.location');
const date=document.querySelector('#date');
const day=document.querySelector('#day');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    console.log('Searching for weather in:', location);
    
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            wDescipt.textContent = data.error;
            temperature.textContent = '';  
            feelsLike.textContent = '';
            address.textContent = '';
            date.textContent = '';
            day.textContent = '';
        } else {

            temperature.textContent = `${data.temperature} degrees`;  
            feelsLike.textContent = `Feels like ${data.feelslike} degrees`;
            wDescipt.textContent = `${data.description}.`;
            address.textContent = `${data.location}`;
            date.textContent = `${data.date}`;
            day.textContent = `${data.day}`;
        }
    });
})
})
