var express = require('express');
var markdownTransformer = require('./markdownTransformer');
var translator = require('./translator');
var fs = require('fs');

var app = express();

// Log user
app.use(function (req, res, next) {
  console.log((new Date()).toString() + " - " + res.statusCode + " - " + req.url + " - " + req.headers['user-agent']);
  next();
});

// Transform Markdown
app.get('/', function(req, res) {
  var file = fs.createReadStream('README.md');
  file.pipe(markdownTransformer()).pipe(res);
});

// Translate english to zombie
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

// Translate zombie to english
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

// Check for input that is too long
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

// 404 status
app.get('*', function (req, res) {
  res.status(404);
  res.json({
    "status": 404,
    "message": "Not found"
  });
});

app.listen(7000);

console.log('Listening on port 7000');
