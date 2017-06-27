'use strict';

var fs = require('fs');
var express = require('express');
var app = express();

  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

app.get('/:timestamp', function(req, res){
  var timestamp = req.params.timestamp;
  var unixPattern = /^\d+$/;
  var naturalPattern = /^\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:ril)?|May?|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:member)?|Dec(?:ember)?)[\s,]*(\d{1,2})[\s,]*(19[7-9]\d|2\d{3})$/;
  var timeObj, tmatch;
  if (timestamp.match(unixPattern)){
    var d = new Date(Number(timestamp));
    timeObj = JSON.stringify({
      "unix": d.getTime(),
      "natural": d.toDateString()
    });
  } else if (tmatch = timestamp.match(naturalPattern)) {// test if condition and assign to tmatch
    var monthDict = {
      "Jan": 0,
      "Feb": 1,
      "Mar": 2,
      "Apr": 3,
      "May": 4,
      "Jun": 5,
      "Jul": 6,
      "Aug": 7,
      "Sep": 8,
      "Oct": 9,
      "Nov": 10,
      "Dec": 11,
      "January": 0,
      "February": 1,
      "March": 2,
      "April": 3,
      "May": 4,
      "June": 5,
      "July": 6,
      "August": 7,
      "September": 8,
      "October": 9,
      "November": 10,
      "December": 11,
    };
    var d = new Date(Number(tmatch[3]), monthDict[tmatch[1]], Number(tmatch[2]));
    timeObj = JSON.stringify({
      "unix": d.getTime(),
      "natural": d.toDateString()
    });
    
  
    
  }
  else timeObj = {"res": "For timestamp please input a unix number or a natural string in format like 'Jan 01 2017'"};
  res.send(timeObj);
  
});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

