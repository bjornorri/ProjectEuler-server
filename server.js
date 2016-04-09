var express = require('express');
var request = require('request');

var port = process.env.PORT || 8081
var app = express();

app.get('/problems', function(req, res) {
  var url = 'https://projecteuler.net/show=all';
  request(url, function(error, res, html) {
    if (error) {
      return;
    }
    console.log(html);
  });
})

app.listen(port);
console.log('Server started on port ' + port);


exports = module.exports = app
