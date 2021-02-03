const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5a371b075e40191893a17191f5e0a986&units=m&query=' + latitude + ','+ longitude + '&units=m'
    request({url: url, json: true }, (error, { body } ) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const { current } = body
            callback(undefined, 
                    current.weather_descriptions[0] + '. It is currently ' + 
                    current.temperature + ' degress out. Feels like ' + 
                    current.feelslike + ' degrees out. The humidity is ' + 
                    current.humidity + '%.'
                )
        }
    })
}

module.exports = forecast