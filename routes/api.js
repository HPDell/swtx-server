/// <reference path="../typings/index.d.ts" />
var express = require('express');
var router = express.Router();

var nearpeople = require("./api/nearpeople");

router.use("/nearpeople", nearpeople.nearpeople);

module.exports = router;