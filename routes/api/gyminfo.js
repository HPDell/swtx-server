"use strict";
exports.__esModule = true;
var mysql = require("mysql");
/**
 * 获取健身房信息
 * @param req 请求
 * @param res 响应
 * @param next 后续回调函数
 */
function GymInfo(req, res, next) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    connection.connect();
    var queryStr = "SELECT * FROM Gym";
    connection.query(queryStr, function (err, results) {
        if (err) {
            res.json({
                gyms: null
            });
        }
        else {
            res.json({
                gyms: results
            });
        }
    });
    connection.end();
}
exports.GymInfo = GymInfo;
