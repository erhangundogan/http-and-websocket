http-and-websocket
==================

Dead simple and minimal standalone nodejs servers working together using http/websocket.

* First server (http://localhost:8000)
  * Generates random string and a number every 5 seconds.
  * Sends generated values to second server through http post.
  * Redirects http get methods to second server.

* Second server (http://localhost:8001)
  * Serves html page to client through http.
  * Creates websocket connections.
  * Sends websocket data message to each client when it received http post from first server.

# Installation

    git clone https://www.github.com/erhangundogan/http-and-websocket
    npm start

Browse [http://localhost:8001](http://localhost:8001)
