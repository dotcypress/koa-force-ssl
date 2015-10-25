#koa-force-ssl

[Koa.js](http://koajs.com/) middleware for force SSL

*This middleware is deprecated, please use [koa-sslify](https://github.com/turboMaCk/koa-sslify)*



## Install 
```
$ npm install koa-force-ssl
```

## API
`forceSSL(port, hostname, temporary);`

* port - SSL port (default value: 443)
* hostname - host name for redirect (by default will redirect to same host)
* temporary - use "302 Temporary Redirect" (by default will use "301 Permanent Redirect")

## Example
```
var koa = require('koa');
var http = require('http');
var https = require('https');
var fs = require('fs');
var forceSSL = require('koa-force-ssl');

var app = koa();

// Force SSL on all page
app.use(forceSSL());

// index page
app.use(function * (next) {
  this.body = "hello world from " + this.request.url;
});

// SSL options
var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}

// start the server
http.createServer(app.callback()).listen(80);
https.createServer(options, app.callback()).listen(443);
```

## License
MIT
