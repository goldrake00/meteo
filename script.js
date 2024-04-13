// fetch all HTML elements I need
const htmlElement = document.documentElement;
const suggestion = document.querySelector('.suggestion');
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');


//Fetch GPS coordinate from Browser (Longitude, Latitude)
//Create 2 functions in case fetch successful or unsuccessful
navigator.geolocation.getCurrentPosition(onSuccess, onError);


//Function in caso di errore 
function onError() {
    weatherLocation.innerText = '';
    weatherIcon.src = "images/geolocation_disabled.png";
    weatherIcon.alt = "Geolocation Disabled"
    htmlElement.className = '';
    suggestion.innerText = 'You must enable geo-location'
}

// Function in caso di successo
async function onSuccess(position) {
    //Store the GPS coordinates retrieved from Browser
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    //Create var for API Call
    const API_key = 'e72b37041e35b73c03d65350eee29854';
    const endpointFree = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`;


    //Call API from Open Weather with asynch call
    const response = await fetch(endpointFree);

    //convert the API response in JSON
    const data = await response.json();
    console.log(data);

    //Select from API response the Icon Code and Weather Description
    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;
    const location = data.name;
    const temperature = `${Math.floor(data.main.temp)}º`;

    //Feed HTML with new info
    weatherLocation.innerText = location;
    weatherIcon.alt = description;
    weatherIcon.src = `images/${iconCode}.png`;
    weatherTemperature.innerText = temperature;
    //disable the overall Class that hide the weather Icon
    htmlElement.className = '';
    suggestion.innerText = getSuggestion(iconCode);

}
//funzione per decidere il suggerimento in base al codice icona

function getSuggestion(iconCode) {
    const suggestions = {
        '01d': "Attention,remeber the solar cream!",
        '01n': "Have a good night!",
        '02d': 'Nice but not so sunny !',
        '02n': 'Have a good night!',
        '03d': 'Hot?',
        '03n': 'Have a good night!',
        '04d': 'dreaming a nice day!',
        '04n': 'Have a good night!',
        '09d': "Nice day!",
        '09n': 'Have a good night!',
        '10d': "Pick up the umbrella",
        '10n': 'Have a good night!',
        '11d': 'Nice day!',
        '11n': 'Have a good night!',
        '13d': 'Snow?',
        '13n': 'Have a good night!',
        '50d': 'Is a nice day?',
        '50n': 'Have a good night!',
    };
    return suggestions[iconCode];
};


