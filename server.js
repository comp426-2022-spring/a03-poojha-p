import { coinFlip, coinFlips, countFlips, flipACoin } from "./modules/coin.mjs";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))

const port = args['port'] || 5000

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.get('/app/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip/', (req, res) => {
    res.status(200);
    const ans = coinFlip();
    const flipResult = {"flip" : ans};
    res.json(flipResult);
});

app.get('/app/flips/:number', (req, res) => {
    res.status(200);
    const flips = req.params.number || 1;
    const values = coinFlips(flips);
    const rawjson = {
        "raw" : values,
        "summary": countFlips(values)
    };
    res.json(rawjson)
});

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200);
    res.json(flipACoin('heads'));
});

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200);
    res.json(flipACoin('tails'));
});

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});