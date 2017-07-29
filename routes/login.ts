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
    if (req.body.UserName) {
        var data:ILoginParam = req.body;
        doQuery(data, req, res);
    } else {
        var body:string = "";
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                var data:ILoginParam = JSON.parse(body);
                doQuery(data, req, res);
            } catch (error) {
                res.json({
                    result: false
                })
            }
        })
    }
}

/**
 * 执行查询操作
 * @param data 请求所发送的数据
 * @param req 请求
 * @param res 响应
 */
function doQuery(data:ILoginParam, req:express.Request, res:express.Response) {
    var queryString:string = 
        "SELECT\
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
    connection.query(queryString, (err:mysql.IError, results:Array<ILoginQueryResult>) => {
        if (err) {
            console.log(err.message);
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
                    updateIp(data.UserName, req.ip);
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

    connection.end();
}

/**
 * 更新地址
 * @param ip IP地址
 */
function updateIp(user:string, ip:string) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    connection.connect();
    // 更新IP
    var queryString:string = "UPDATE Users SET Users.UserLastIP = '" + ip + "' WHERE Users.UserName = '" + user + "'";
    connection.query(queryString, (err:mysql.IError, results:Array<ILoginQueryResult>) => {
        if (err) {
            console.log(err.message);
        }
    })
}