import { tempUploadURL } from './aws/s3.js'
import { savedUploadURL } from './aws/s3.js'
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
const port = 8000;

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

app.get('https://s3.ap-northeast-2.amazonaws.com/xr-box/shop_file/xr-temp', async (req, res) =>{
  const tempUrl = await tempUploadURL()
  res.send({tempUrl})
})                                                        

app.get("https://s3.ap-northeast-2.amazonaws.com/xr-box/shop_file/xr-saved", async (req, res) => {
  const savedUrl = await savedUploadURL()
  res.send({savedUrl})
});

app.listen(port, () => {
  console.log("starting server at port 8000..");
});
