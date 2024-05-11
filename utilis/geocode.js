const NodeGeocoder = require('node-geocoder');


const options = {
    provider :process.env.GEO_PROVIDER,
    httpAdapters:'https',
    apiKey:process.env.GEO_APIKEY,
    formatter:null
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder;