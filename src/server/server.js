var express = require('express');
var app = express();
var path = require('path');
var PORT =process.env.PORT || 5000;
var app_path = '../dist/portfolioWebApp';

app.use('/', express.static(path.join(__dirname+app_path)))
.get('*',(req,res)=>res.sendFile(path.join(__dirname,app_path+'/index.html')))
.listen(PORT, ()=>console.log(`Listening on ${PORT}`));