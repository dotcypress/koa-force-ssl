#koa-force-ssl

[Koa.js](http://koajs.com/) middleware for force SSL

## Install 
```
$ npm install koa-force-ssl
```

## API
`forceSSL(port, host);`

* port - SSL port (default value: 443)
* host - host name for redirect (by default will redirect to same host)

## Example
```
var koa = require('koa');
var http = require('http');
var https = require('https');
var fs = require('fs');
var forceSSL = require('./index');

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
