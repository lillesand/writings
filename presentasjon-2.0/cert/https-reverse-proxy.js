var httpProxy = require('http-proxy'),
    fs = require('fs');

//
// Create the HTTPS proxy server in front of a HTTP server
//
httpProxy.createServer({
    target: {
        host: 'localhost',
        port: 1338
    },
    ssl: {
        key: fs.readFileSync('server.key', 'utf8'),
        cert: fs.readFileSync('server.crt', 'utf8')
    }
}).listen(1337);