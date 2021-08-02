const request = require('request');

const geoCode = (adresse, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adresse) + '.json?access_token=pk.eyJ1IjoiYWxnZXJpYW55YWNpbmUiLCJhIjoiY2tyczY5MjByMHBlMzJucWM2Y2tvcWZociJ9.zjPNxkMf3xrEGgUVb8X9ag&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect.", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find adress.", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geoCode