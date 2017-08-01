/// <reference path="../typings/index.d.ts" />
var express = require('express');
var router = express.Router();
// 自定义处理函数
var nearpeople = require("./api/nearpeople");
var gyminfo = require('./api/gyminfo');

router.get("/nearpeople", nearpeople.nearpeople);
router.get("/gyminfo", gyminfo.GymInfo);

module.exports = router;