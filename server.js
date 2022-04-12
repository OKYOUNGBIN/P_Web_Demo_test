import { tempUploadURL } from './aws/s3_temp.js'
import { savedUploadURL } from './aws/s3_saved.js'
import { htmlUploadURL } from './aws/s3_html.js'
import { createRequire } from "module";
import { fileURLToPath } from 'url';
//import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
const port = 8000;
const path = require('path');
const __dirname = path.dirname(__filename);

app.use(express.static('model-viewer'))
app.use(express.static('aws'));;
app.use(express.static('models'));
app.use(express.static('images'));
app.use(express.static('public'));

app.use(express.static('chair'));
app.use(express.static('shelf'));
app.use(express.static('table'));

app.get('/modelviewer', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/modelViewer.html'));
});

app.get('/s3UrlTemp', async (req, res) =>{
  const tempUrl = await tempUploadURL()
  res.send({tempUrl})
})

app.get('/s3UrlSaved', async (req, res) =>{
  const savedUrl = await savedUploadURL()
  res.send({savedUrl})
})

app.get("/s3UrlHtml", async (req, res) => {
  const htmlUrl = await htmlUploadURL()
  res.send({htmlUrl})
});

app.listen(port, () => {
  console.log("starting server at port 8000..");
});
