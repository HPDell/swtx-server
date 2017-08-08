"use strick";
exports.__esModule=true;
var mysql = require("mysql");

function AddRunningInfo(req, res, next) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    var queryStrings = "INSERT INTO RunningInfo(UserId, RouteInfo) \
    VALUES(" + req.body.RouteInfo.UserId + ", '" + JSON.stringify(req.body.RouteInfo) + "')"
    connection.query(queryStrings, function (err, results) {
        if (err) {
            res.json({
                status: (err.message + " " + req.body.RouteInfo.UserId + " " + JSON.stringify(req.body.RouteInfo)) + "......" + queryStrings
            });
            return;
        }
        else {
            res.json({
                status: true
            });
        }
    });
    connection.end();
}
exports.AddRunningInfo = AddRunningInfo;