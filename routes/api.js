/// <reference path="../typings/index.d.ts" />
var express = require('express');
var router = express.Router();
// 自定义处理函数
var nearpeople = require("./api/nearpeople");
var gyminfo = require('./api/gyminfo');
var neardrinks = require('./api/neardrinks');

router.get("/nearpeople", nearpeople.nearpeople);
router.get("/gyminfo", gyminfo.GymInfo);
router.get("/neardrinks", neardrinks.NearDrinks);

module.exports = router;