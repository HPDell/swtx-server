"use strict";
exports.__esModule = true;
var mysql = require("mysql");

function RoadLamps(req, res, next) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    var params = req.query;
    
    var queryStrings = "SELECT * FROM RoadLamp" + 
    " WHERE RoadLamp.Lat > " + params.minLat + " and RoadLamp.Lat < " + params.maxLat + 
    " and RoadLamp.Lng > " + params.minLng + " and RoadLamp.Lng < " + params.maxLng;
    connection.query(queryStrings, function (err, results) {
        if (err) {
            res.json({
                RoadLamps: []
            });
            return;
        }
        else {
            res.json({
                RoadLamps: results
            });
        }
    });
    connection.end();
}
exports.RoadLamps = RoadLamps;