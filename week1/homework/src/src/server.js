'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
  });

  return server;
}

module.exports = {
  createServer
};
"use strict";

const http = require("http");

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function successState(response, state) {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ state }));
}

function errorState(response) {
  response.writeHead(400, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ error: "404, Not found" }));
}

function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      default:
        errorState(response, state);
      case "/state":
      case "/":
        successState(response, state);
        break;
      case "/add":
        successState(response, ++state);
        break;
      case "/subtract":
        successState(response, --state);
        break;
      case "/reset":
        successState(response, (state = 10));
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};