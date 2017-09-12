"use strict";
exports.__esModule = true;
var mysql = require("mysql");

function NearDrinks(req, res, next) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    var params = req.query;
    
    var queryStrings = "SELECT * FROM RoadLamp" + 
    " WHERE RoadLamp.Lat > " + params.minLat + " and Drink.Lat < " + params.maxLat + 
    " and RoadLamp.Lng > " + params.minLng + " and RoadLamp.Lng < " + params.maxLng;
    connection.query(queryStrings, function (err, results) {
        if (err) {
            res.json({
                neardrinks: []
            });
            return;
        }
        else {
            res.json({
                neardrinks: results
            });
        }
    });
    connection.end();
}
exports.NearDrinks = NearDrinks;