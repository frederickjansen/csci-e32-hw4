var express = require('express');
var markdownTransformer = require('./markdownTransformer');
var translator = require('./translator');
var fs = require('fs');

var app = express();

app.use(function(req, res, next){
  console.log((new Date()).toString() + " - " + req.method + " - " + req.url + " - " + req.headers['user-agent']);
  next();
});

// catch 404 and forward to error handler
app.get('*', function(req, res) {
  res.status(404);
  res.json({ "status": 404, "message": "Not found" });
});


app.listen(7000);

console.log('Listening on port 7000');
