const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=f37bef904dc62146a790c9ba7a254334&units=metric&lang=ar'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect.", undefined);
        } else if (body.cod == 400) {
            callback("Unable to find location.", undefined);
        } else {
            callback(undefined, {
                name: body.name,
                description: body.weather[0].description,
                temp: body.main.temp,
                humidity: body.main.humidity
            })
        }
    })
}


module.exports = forecast