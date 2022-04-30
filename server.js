//Express
const express = require('express')

//local access to express
const app = express()

// app object has lots of useful methods
// get(), post(), put(), delete(), REST framework!
//app.get('/', (req, res))
// '/' represents root of website url

const args = require('minimist')(process.argv.slice(2));

var port = args.port || 5000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

function coinFlip() {
    return (Math.random() > 0.5 ? 'heads' : 'tails');
}