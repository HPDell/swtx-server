"use strict";
exports.__esModule = true;
var mysql = require("mysql");
function login(req, res, next) {
    if (req.body.UserName) {
        var data = req.body;
        doQuery(data, req, res);
    }
    else {
        var body = "";
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            try {
                var data = JSON.parse(body);
                doQuery(data, req, res);
            }
            catch (error) {
                res.json({
                    result: false
                });
            }
        });
    }
}
exports.login = login;
/**
 * 执行查询操作
 * @param data 请求所发送的数据
 * @param req 请求
 * @param res 响应
 */
function doQuery(data, req, res) {
    var queryString = "SELECT\
            Users.UserName,\
            Users.UserPassword\
        FROM\
            Users\
        WHERE\
        Users.UserName = '" + data.UserName + "'";
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
            console.log(err.message);
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
                    updateIp(data.UserName, req.ip);
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
    connection.end();
}
/**
 * 更新地址
 * @param ip IP地址
 */
function updateIp(user, ip) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    connection.connect();
    // 更新IP
    var queryString = "UPDATE Users SET Users.UserLastIP = '" + ip + "' WHERE Users.UserName = '" + user + "'";
    connection.query(queryString, function (err, results) {
        if (err) {
            console.log(err.message);
        }
    });
}
