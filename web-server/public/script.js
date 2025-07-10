const weatherForm = document.querySelector('#searchForm');
const search = document.querySelector('input');
const temperature = document.querySelector('#temp');
const feelsLike = document.querySelector('#feelslike');
const wDescipt = document.querySelector('#desc');
const address = document.querySelector('.location');
const date = document.querySelector('#date');
const day = document.querySelector('#day');

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Reusable function to fetch and update weather info
function updateWeather(location) {
    fetch(`/weather-data?address=${encodeURIComponent(location)}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
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
                address.textContent = `${location}`;
                date.textContent = `${data.date}`;
                day.textContent = `${data.day}`;
            }
        });
}

// Auto-fetch weather if on weather page and address is in URL
if (temperature && feelsLike && wDescipt && address && date && day) {
    const location = getQueryParam('address');
    if (location) {
        updateWeather(location);
    }
}

if (weatherForm) {
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = search.value;

        // If on weather page, update content; if on index, redirect
        if (temperature && feelsLike && wDescipt && address && date && day) {
            updateWeather(location);
        } else {
            window.location.href = `/weather?address=${encodeURIComponent(location)}`;
        }
    });
}
