import { generateUploadURL } from './aws/s3.js'
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static('model-viewer'));
app.use(express.static('models'));
app.use(express.static('images'));
app.use(express.static('public'));
app.use(express.static('chair'));
app.use(express.static('leg'));
app.use(express.static('seat'));
app.use(express.static('shelf'));

app.get("/", (req, res) => {
  res.send(`Welcome to my server! This is the homepage on port ${port}`);
});

app.get('/s3Url', async (req, res) =>{
  const url = await generateUploadURL()
  res.send({url})
})

// app.get("/xr", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html")
// });

app.listen(port, () => {
  console.log("starting server at port 3000..");
});
