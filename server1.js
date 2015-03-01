var http = require('http');
var request = require('request');

var getRandomWord = function () {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWYZX';
  var word = [];
  for (var i = 0; i < 8; i++) {
    var char = parseInt(Math.random() * alphabet.length);
    word.push(alphabet[char]);
  }
  return word.join('');
};

var getRandomValue = function () {
  return parseInt(Math.random() * 10000000);
};

var createRandomData = function () {
  return {
    text: getRandomWord(),
    number: getRandomValue()
  };
};

var serverProcess = function () {
  var requestInterval = setInterval(function () {
    var requestData = createRandomData();
    request({
      url: 'http://localhost:8001',
      method: 'POST',
      json: requestData
    }, function (error, response) {
      if (error) {
        console.error(error);
      } else {
        console.log(requestData);
      }
    });
  }, 5000); // 5 secs
};

var server = http.createServer(function (req, res) {
  res.writeHead(302, {
    'Location': 'http://localhost:8001/'
  });
  res.end();
});

serverProcess();

server.listen(8000, 'localhost');

console.log('Server running at http://localhost:8000/');