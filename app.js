// imports
const geocode = require('./utils/geocoords')
const forecast = require('./utils/forecast')
const yargs = require('yargs')

const mode = process.argv[2]

yargs.command({
    command: 'get',
    describe: 'get weather for location',
    builder: {
        loc: {
            describe: 'Address',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => geocode.getCoords(argv.loc, (city, coords) => forecast.getWeather(city, coords))
})

yargs.parse()