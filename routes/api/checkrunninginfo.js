"use strict";
exports.__esModule = true;
var mysql = require("mysql");

function CheckRunningInfo(req, res, next) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    var params = req.query;
    
    var queryStrings = "SELECT * FROM swtx.RunningInfo \
        WHERE RunningInfo.RunningInfoId = ( \
        SELECT MAX(RunningInfoId) FROM swtx.RunningInfo \
        WHERE RunningInfo.UserId = " + params.UserId + ")"
    connection.query(queryStrings, function (err, results) {
        if (err) {
            res.json({
                RunningInfo: null
            });
            return;
        }
        else {
            res.json({
                RunningInfo: results
            });
        }
    });
    connection.end();
}
exports.CheckRunningInfo = CheckRunningInfo;