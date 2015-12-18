var express = require('express');
var markdownTransformer = require('./markdownTransformer');
var translator = require('./translator');
var fs = require('fs');

var app = express();

app.use(function (req, res, next) {
  console.log((new Date()).toString() + " - " + req.method + " - " + req.url + " - " + req.headers['user-agent']);
  next();
});

app.get('/', function(req, res) {
  var file = fs.createReadStream('README.md');
  file.pipe(markdownTransformer()).pipe(res);
});

app.get('/zombify/:text', function (req, res) {
  var text = req.params.text;
  if (inputTooLong(res, text, 1000)) {
    return;
  }
  var translation = translator.zombify(text);
  res.status(200);
  res.json({
    "message": translation
  });
});

app.get('/unzombify/:text', function (req, res) {
  var text = req.params.text;
  if (inputTooLong(res, text, 1000)) {
    return;
  }
  var translation = translator.unzombify(text);
  res.status(200);
  res.json({
    "message": translation
  });
});

function inputTooLong(res, input, maxLength) {
  if (input.length > maxLength) {
    res.status(414);
    res.json({
      "status": 414,
      "message": 'Input too long'
    });
    return true;
  }
  return false;
}

app.get('*', function (req, res) {
  res.status(404);
  res.json({
    "status": 404,
    "message": "Not found"
  });
});


app.listen(7000);

console.log('Listening on port 7000');
