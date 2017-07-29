"use strict";
exports.__esModule = true;
var mysql = require("mysql");
function login(req, res, next) {
    var data = req.body;
    var queryString = "";
    // 连接数据库
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    connection.connect();
    // 查询
    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                result: false
            });
        }
        else {
            if (results.length > 0) {
                var item = results[0];
                if (item.UserPassword === data.Password) {
                    res.json({
                        result: true
                    });
                    // TODO 数据库记录登录IP
                    console.log("Request IP:" + req.ip);
                }
                else {
                    res.json({
                        result: false
                    });
                }
            }
            else {
                res.json({
                    result: false
                });
            }
        }
    });
}
exports.login = login;
