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

    var params:INearPeopleQueryParams = req.query;
    var queryStrings:string = 
        'SELECT corsstable.UserID, corsstable.UserName, corsstable.UserGender, corsstable.UserAverageRunTime, corsstable.UserAddress, corsstable.PositionTime, corsstable.PositionLat, corsstable.PositionLng\
        FROM (SELECT\
                    Users.UserID,\
                    Users.UserName,\
                    Users.UserGender,\
                    Users.UserAverageRunTime,\
                    Users.UserAddress,\
                    Position.PositionTime,\
                    Position.PositionLat,\
                    Position.PositionLng\
                FROM\
                    Users\
                RIGHT JOIN Position ON Users.UserID = Position.PositionUserID\
                WHERE\
                    Users.UserID <> ' + params.UserID + '\
                ORDER BY\
                    Position.PositionTime DESC) AS corsstable\
        GROUP BY corsstable.UserName';
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