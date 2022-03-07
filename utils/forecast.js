// imports
const request = require('postman-request');

// weather API data
const URL = 'http://api.weatherstack.com/';
const mode = 'current?access_key=';
const apiKey = process.env.WEATHERSTACKAPIKEY;
const query = '&query=';
const units = '&units=m';

// request to weather API to load current weather for location
const getWeather = (error, {coords, placeName} = {}) => { // challenge 11 code
    if (error) {
        console.log(error);
    } else {
        request(
            {
                // coords need to be in reverse due to difference between API (geocoords gives lon,lat, weather takes lat,lon)
                url: URL + mode + apiKey + query + coords[1] + ',' + coords[0] + units,
                json: true
            },
            (error, response) => {
                if (error) {
                    console.log(error.message);
                } else if (response.body.error) {
                    console.log('Error ' + response.body.error.code + ': ' + response.body.error.info);
                } else {
                    const {statusCode, statusMessage} = response // challenge 11 code
                    console.log('Response Status: ' + statusCode + ' ' + statusMessage); // challenge 11 code
                    console.log('Weather forecast for: ' + placeName);
                    response.body.current.weather_descriptions.forEach((el) => {
                        console.log(el);
                    });
    
                    // challenge 6 code:
                    console.log('Current temperature: ' + response.body.current.temperature + ' degrees (RealFeel: ' + response.body.current.feelslike + ' degrees)');
                    console.log('Rain probability: ' + response.body.current.precip + ' %');
                }
            }
        )
    }
}

module.exports = {
    getWeather: getWeather
}