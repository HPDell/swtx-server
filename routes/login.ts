import * as express from "express";
import * as mysql from "mysql";

interface ILoginParam {
    UserName: string;
    Password: string;
}

interface ILoginQueryResult {
    UserName: string;
    UserPassword: string;
}

export function login(req:express.Request, res:express.Response, next:express.NextFunction) {
    var data:ILoginParam = req.body;
    var queryString:string = ``;
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
    connection.query(queryString, (err:mysql.IError, results:Array<ILoginQueryResult>) => {
        if (err) {
            res.json({
                result: false
            });
        } else {
            if (results.length > 0) {
                var item = results[0];
                if (item.UserPassword === data.Password) {
                    res.json({
                        result: true
                    });
                    // TODO 数据库记录登录IP
                    console.log("Request IP:" + req.ip);
                } else {
                    res.json({
                        result: false
                    });
                }
            } else {
                res.json({
                    result: false
                });
            }
        }
    });
}