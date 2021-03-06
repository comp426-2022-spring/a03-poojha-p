//import {coinFlip, coinFlips, countFlips, flipACoin} from "./modules/coin.mjs"
//import { createRequire } from 'module';

const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))

args['port']

const port = args['port'] || 5000

const server = app.listen(port, () => {
  console.log("App is running on port %PORT%".replace("%PORT%", port))
});

function coinFlip() {
  return (Math.random() > 0.5 ? 'heads' : 'tails');
}

function coinFlips(flips) {
  let arr_coins = [];

  if (!flips) {
    arr_coins.push(coinFlip());
  } else {
    for (var i = 0; i < flips; i++) {
      Math.random() > 0.5 ? arr_coins.push("heads") : arr_coins.push("tails");
    }
  }

  return arr_coins;
}

function countFlips(array) {
  var heads = 0;
  var tails = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] == "heads") {
      heads++;
    } else {
      tails++;
    }
  }

  if (heads > 0 && tails == 0) {
    return { "heads": heads}
  } else if (tails > 0 && heads == 0) {
    return { "tails": tails}
  } else {
    return { "heads": heads, "tails": tails }
  }
}

function flipACoin(call) {
  var verdict = 'win';
  var flip = coinFlip();

  if (!(call == flip)) {
    verdict = 'lose';
  }

  return { 'call': call, 'flip': flip, 'result': verdict };
}

//--ENDPOINTS!--

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

app.get('/app/flips/:number/', (req, res) => {
  res.status(200);
  const flips = req.params.number || 1;
  const values = coinFlips(flips);
  const rawjson = {
      "raw" : values,
      "summary": countFlips(values)
  };
  res.json(rawjson)
});

app.get('/app/flip/call/heads/', (req, res) => {
  res.status(200);
  res.json(flipACoin('heads'));
});

app.get('/app/flip/call/tails/', (req, res) => {
  res.status(200);
  res.json(flipACoin('tails'));
});

app.use(function(req, res){
  res.status(404).send('404 NOT FOUND')
});
