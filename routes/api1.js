"use strict";
exports.__esModule = true;
var express = require("express");
var nearpeople_1 = require("./api/nearpeople");
var router = express.Router();
exports.router = router;
router.use("/nearpeople", nearpeople_1.nearpeople);
