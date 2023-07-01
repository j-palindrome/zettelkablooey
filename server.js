"use strict";

var _path = _interopRequireDefault(require("path"));
var _express = _interopRequireDefault(require("express"));
var _compression = _interopRequireDefault(require("compression"));
var _morgan = _interopRequireDefault(require("morgan"));
var _express2 = require("@remix-run/express");
var _node = require("@remix-run/node");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _node.installGlobals)();
var app = (0, _express["default"])();
app.use((0, _compression["default"])());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use("/build", _express["default"]["static"]("public/build", {
  immutable: true,
  maxAge: "1y"
}));

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(_express["default"]["static"]("public", {
  maxAge: "1h"
}));
app.use((0, _morgan["default"])("tiny"));
var BUILD_DIR = _path["default"].join(process.cwd(), "build");
var MODE = process.env.NODE_ENV;
app.all("*", MODE === "production" ? (0, _express2.createRequestHandler)({
  build: require(BUILD_DIR),
  mode: MODE
}) : function () {
  purgeRequireCache();
  return (0, _express2.createRequestHandler)({
    build: require(BUILD_DIR),
    mode: MODE
  }).apply(void 0, arguments);
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("\u2705 Express server listening on port ".concat(port));
});
function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (var key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
