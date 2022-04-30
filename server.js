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
