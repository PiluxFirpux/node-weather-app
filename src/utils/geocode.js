const request = require('postman-request')

const geocode = (address, callback) => {
    const mapBoxToken = 'pk.eyJ1IjoicGlsdXgiLCJhIjoiY2trODV6dzc1MGphMjJvbWhmMG02czhwbyJ9.BXNOnG6Osx5GPuWa2OJlyw'
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapBoxToken + '&limit=1'
    console.log('Requesting URL: ' + mapBoxUrl)
    request({url: mapBoxUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geolocation service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode