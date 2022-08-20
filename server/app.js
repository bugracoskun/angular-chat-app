#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config();
var express = require('express');

var indexRouter = require('./routes/index');

var app = express();

app.use(express.json({ limit: '6000mb' }));
app.use(express.urlencoded({ limit: '6000mb', extended: false }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

app.use('/', indexRouter);

app.use(function (err, req, res, next) {
    if (err) {
        console.log(err);
    }
});

//var http = require('http');
const cors = require('cors');
///////////////
const https = require('https');
const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');
console.log(key);
console.log(cert);
///////////////

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '4242');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = https.createServer({ key: key, cert: cert }, app);

/**
 * Listen on provided port, on all network interfaces.
 */
app.use(
    cors({
        origin: [
            "http://localhost:4200",
            process.env.NEXTCLOUD_URL,
            process.env.WEBODM_URL]
    })
);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
}

