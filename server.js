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
