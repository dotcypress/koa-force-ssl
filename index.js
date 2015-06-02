var url = require('url');

/**
 * Force SSL.
 *
 * @param {Integer} port
 * @param {String} hostname
 * @param {Boolean} temporary
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
