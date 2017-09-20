/// <reference path="../typings/index.d.ts" />
var express = require('express');
var router = express.Router();
// 自定义处理函数
var nearpeople = require("./api/nearpeople");
var gyminfo = require('./api/gyminfo');
var neardrinks = require('./api/neardrinks');
var routestops = require("./api/routestops");
var addrunninginfo = require("./api/addrunninginfo");
var checkrunninginfo = require("./api/checkrunninginfo");
var roadlamps = require('./api/roadlamp');
var getinterestviews = require('./api/getinterestviews');

router.get("/nearpeople", nearpeople.nearpeople);
router.get("/gyminfo", gyminfo.GymInfo);
router.get("/neardrinks", neardrinks.NearDrinks);
router.get("/roadlamps", roadlamps.RoadLamps);
router.get("/routestops", routestops.RouteStops);
router.get("/checkrunninginfo", checkrunninginfo.CheckRunningInfo);
router.get("/getinterestviews", getinterestviews.GetInterestViews);
router.post("/addrunninginfo", addrunninginfo.AddRunningInfo);

module.exports = router;