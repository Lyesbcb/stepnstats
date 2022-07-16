const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const runsRouter = require('./routes/runs');
const nftsRouter = require('./routes/nfts');
var https = require('https');
var fs = require('fs');

const httpsOptions = {
  key: fs.readFileSync('./security/key.pem'),
  cert: fs.readFileSync('./security/cert.pem')
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/runs', runsRouter);

app.use('/nfts', nftsRouter);


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})