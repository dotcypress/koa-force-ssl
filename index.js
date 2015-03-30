var url = require('url');

/**
 * Force SSL.
 *
 *  Pass an optional `key` to use when checking for
 *  a method override, otherwise defaults to _\_method_.
 *  The original method is available via `request.originalMethod`.
 *
 * @param {Integer} port
 * @param {String} hostname
 * @param {Boolens} temporary
 * @return {Function}
 * @api public
 */

module.exports = function forceSSL(port, hostname, temporary) {
  return function* forceSSL(next) {
    if (this.secure) {
      return yield next;
    }
    var httpsPort = port || 443;
    var urlObject = url.parse('http://' + this.request.header.host);
    var httpsHost = hostname || urlObject.hostname;
    if (!temporary) {
      this.response.status = 301;
    }
    this.response.redirect('https://' + httpsHost + ':' + httpsPort + this.request.url);
  };
};
