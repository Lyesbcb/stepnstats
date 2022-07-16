require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const getMp = require("./getMp")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/runs', require('./runs/runs.controller'));
app.use('/mbs', require('./mbs/mbs.controller'));
app.use('/nfts', require('./nfts/nfts.controller'));
app.use('/mps/solana', require('./mps/solana/solanaMps.controller'));
app.use('/mps/bnb', require('./mps/bnb/bnbMps.controller'));
app.use('/mps/ethereum', require('./mps/ethereum/ethereumMps.controller'));
// getMp.getMp()

setInterval(function(){ 
  getMp.getMp()
}, 600000);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));