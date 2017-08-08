"use strict";
exports.__esModule = true;
var mysql = require("mysql");

function RouteStops(req, res, next) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    var params = req.query;
    
    var queryStrings = "SELECT * FROM swtx.EndNodesOfRoutePlanning" + 
    " WHERE EndNodesOfRoutePlanning.lat > " + params.minLat + " and EndNodesOfRoutePlanning.lat < " + params.maxLat + 
    " and EndNodesOfRoutePlanning.lng > " + params.minLng + " and EndNodesOfRoutePlanning.lng < " + params.maxLng;
    connection.query(queryStrings, function (err, results) {
        if (err) {
            res.json({
                RouteStops: null
            });
            return;
        }
        else {
            res.json({
                RouteStops: results
            });
        }
    });
    connection.end();
}
exports.RouteStops = RouteStops;