'user strict';

var express = require('express');

var app = express();


app.get('/', function(req, res){
  //parse IP
  var ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  var clientIP = ip.split(',')[0];
  
  //parse language
  var language = req.headers['accept-language'].split(';')[0];
  
  //parse os
  var userAgent = req.headers['user-agent'];
  var pattern = /^Mozilla\/\d+\.\d+ \((.*?)\)/g;
  var os = pattern.exec(userAgent)[1];
  
  
  res.send(JSON.stringify({
    "ipaddress": clientIP,
    "language": language,
    "os": os
  }));
  
  //User-Agent: Mozilla/<version> (<system-information>) <platform> (<platform-details>) <extensions>
  
});

app.use(function(err, req, res,next){
  if (err)
    console.error(err);
});

app.listen(process.env.PORT, function(){
  console.log('whoAmI listening...\n');
});