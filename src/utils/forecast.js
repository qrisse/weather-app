const request=require('request')

const forecast = (lat, lon, callback) => {
    const url=`https://api.darksky.net/forecast/6284b8c8f36d605b519babe4a3460a77/${lat},${lon}?units=si&lang=sv`
    request({url,json: true},(error, {body})=>{
        if (error) {
            callback('Couldn\'t connect to weather service',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            const current=body.currently
            callback(undefined,body.daily.data[0].summary+` Its currently ${current.temperature} degrees outside. There is a ${current.precipProbability}% chance of rain. Daily high: ${body.daily.data[0].temperatureHigh} Daily low: ${body.daily.data[0].temperatureLow}`)
        }
    })
}

module.exports = forecast