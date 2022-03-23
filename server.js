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
      return `{ heads: ${heads}}`
    } else if (tails > 0 && heads == 0) {
      return `{ tails: ${tails}}`
    } else {
      return `{ heads: ${heads}, tails: ${tails} }`
    }
  }

function flipACoin(call) {
    var verdict = 'win';
    var flip = coinFlip();
  
    if (!(call == flip)) {
      verdict = 'lose';
    }
  
    return `{ call: ${call}, flip: ${flip}, result: ${verdict} }`;
  }

app.get('/app/', (req, res) => {
    //route handler
    res.status(200).end('OK')
    //what does this line mean? why 'text/plain?'
    res.type('text/plain')
});

app.get('/app/flip', (req, res) => {
    res.status(200)
    res.type('text/plain')
    res.json({'flip': coinFlip()})
});

app.get('/app/flips/:number', (req, res) => {
    res.status(200)
    var flip = coinFlips(req.params.number)
    res.json({'raw': flip, 'summary': countFlips(flip)})
});

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200)
    res.json(flipACoin('heads'))    
});

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200)
    res.type('text/plain')
    res.json(flipACoin('tails'))
})

app.use(function(req, res) {
    res.status(404).send('404 ERROR')
    res.type('text/plain')
})

