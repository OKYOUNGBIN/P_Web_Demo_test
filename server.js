import { tempUploadURL } from './aws/s3_temp.js'
import { savedUploadURL } from './aws/s3_saved.js'
import { htmlUploadURL } from './aws/s3_html.js'
import { createRequire } from "module";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
const port = 8000;
const path = require('path');
const __dirname = path.dirname(__filename);

app.use(express.static("node_modules"));
app.use(express.static('model-viewer'))
app.use(express.static('aws'));;
app.use(express.static('models'));
app.use(express.static('images'));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/chair', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/chair.html'));
});

app.get('/cabinet', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/cabinet.html'));
});

app.get('/table', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/table.html'));
});

app.get('/shelf', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/shelf.html'));
});

app.get('/objects', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/objects.html'));
});

app.get('https://d2d3yuaczk15qx.cloudfront.net/shop_file/xr-temp/', async (req, res) => {
  const tempUrl = await tempUploadURL()
  res.header("Access-Control-Allow-Origin", "*");
  res.send({ tempUrl })
})

app.get('https://d2d3yuaczk15qx.cloudfront.net/shop_file/xr-saved/', async (req, res) => {
  const savedUrl = await savedUploadURL()
  res.header("Access-Control-Allow-Origin", "*");
  res.send({ savedUrl })
})

app.get("https://d2d3yuaczk15qx.cloudfront.net/shop_file/xr-viewer/", async (req, res) => {
  const htmlUrl = await htmlUploadURL()
  res.header("Access-Control-Allow-Origin", "*");
  res.send({ htmlUrl })
});

app.listen(port, () => {
  console.log("starting server at port 8000..");
});
