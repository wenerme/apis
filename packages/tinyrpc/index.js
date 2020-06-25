"use strict";

exports.__esModule = true;

var _lib = require("./lib/tinyrpc");

Object.keys(_lib).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _lib[key];
});
