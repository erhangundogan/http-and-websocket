var http = require('http');
var fs = require('fs');
var io = require('socket.io');

// http server setup for server1 post request
var server = http.createServer(function (req, res) {

  if (req.method === 'POST') {
    var body = '';

    req.on('data', function (data) {

      body += data;

      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });

    req.on('end', function () {
      if (body) {
        var postData = JSON.parse(body);
        // push received data to clients
        io.emit('data', postData);
      }
    });
    res.end();

  } else if (req.method === 'GET') {
    var file = fs.createReadStream(__dirname + '/index.html');
    res.writeHead(200, {
      "Content-Type" : "text/html"
    });
    file.pipe(res);
  }
});

// socket.io setup for client connection
io = io(server);

io.on('connection', function (socket) {
  console.log('Client connected. Socket id:', socket.id);
  socket.on('disconnect', function () {
    console.log('disconnected!');
  });
});

server.listen(8001, 'localhost');

console.log('Server running at http://localhost:8001/');