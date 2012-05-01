/**
 * Proxy error extension for Cloudnode
 *
 * This extension provides web statistics using Redis counters
 */

"use strict";

var errorHtml = '<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">' +
  '<head>' +
    '<title id="title">{title}</title>' +
    '<style stype="text/css">' +
      'html { font-family: Arial,Helvetica,sans-serif; }' +
      'div { width: 100%; text-align: center; margin-top: 230px; color: #909090; }' +
    '</style>' +
  '</head>' +
  '<body>' +
    '<div>' +
      '<img src="https://cloudno.de/static/img/cloudnode-logo2-light.png" alt="logo" />' +
        '<h1>{code}</h1>' +
        '<h3>{error}</h3>' +
    '</div>' +
  '</body>' +
'</html>';

/**
 * Outputs a customized error page
 */
exports.getErrorPage = function(title, code, error) {
    return errorHtml.replace('{title}', title).replace('{code}', code).replace('{error}', error);
};

