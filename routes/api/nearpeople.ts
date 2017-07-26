import * as express from "express";
import * as mysql from "mysql";

/**
 * 查询请求参数类型
 */
interface INearPeopleQueryParams {
    /** 用户ID */ UserID: number;
}

/**
 * 查询结果参数类型
 */
// interface INearPeopleResult {
//     /** 用户名 */     UserName: string;
//     /** 更新时间 */   PositionTime: number;
//     /** 经度 */       PositionLat: number;
//     /** 纬度 */       PositionLng: number;
// }

export function nearpeople(req:express.Request, res:express.Response, next:express.NextFunction) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });

    var params:INearPeopleQueryParams = req.params;
    var queryStrings:string = 
        'SELECT\
            Users.UserName,\
            Position.PositionTime,\
            Position.PositionLat,\
            Position.PositionLng\
        FROM\
            Users\
        RIGHT JOIN Position ON Users.UserID = Position.PositionUserID\
        WHERE\
            Users.UserID <> ` + params.UserID.toString() + `\
        GROUP BY\
            Users.UserID\
        ORDER BY\
            Position.PositionTime DESC\
        LIMIT 0, 1';
    connection.query(queryStrings, function (err:mysql.IError, results:any) {
        if (err) {
            res.json({
                NearPeople: []
            })
            return;
        } else {
            res.json({
                NearPeople: results
            })
        }
    });
    connection.end();
}