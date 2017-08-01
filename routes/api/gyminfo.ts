import express = require('express');
import mysql = require('mysql');

/**
 * 获取健身房信息
 * @param req 请求
 * @param res 响应
 * @param next 后续回调函数
 */
export function GymInfo(req:express.Request, res:express.Response, next:express.NextFunction) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    connection.connect();
    var queryStr = "SELECT * FROM Gym";
    connection.query(queryStr, function (err:mysql.IError, results:any) {
        if (err) {
            res.json({
                gyms: null
            })
        } else {
            res.json({
                gyms: results
            })
        }
    })
    connection.end();
}