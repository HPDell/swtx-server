import * as express from "express";
import * as mysql from "mysql";

/**
 * 查询请求参数类型
 */
interface INearDrinksQueryParams {
    /** 最小经度 */       minLng: number;
    /** 最小纬度 */       minLat: number;
    /** 最大经度 */       maxLng: number;
    /** 最大纬度 */       maxLat: number;
}

/**
 * 查询结果参数类型
 */
// interface INearDrinksResult {
//     /** id */     DrinkID: number;
//     /** 名字 */   DrinkName: string;
//     /** 纬度 */       DrinkLat: number;
//     /** 经度 */       DrinkLng: number;
// }

export function NearDrinks(req:express.Request, res:express.Response, next:express.NextFunction) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });

    var params:INearDrinksQueryParams = req.query;
    var queryStrings:string = "SELECT * FROM Drink" + 
    " WHERE Drink.DrinkLat > " + params.minLat + " and Drink.DrinkLat < " + params.maxLat + 
    " and Drink.DrinkLng > " + params.minLng + " and Drink.DrinkLng < " + params.maxLng;
    connection.query(queryStrings, function (err:mysql.IError, results:any) {
        if (err) {
            res.json({
                neardrinks: []
            })
            return;
        } else {
            res.json({
                neardrinks: results
            })
        }
    });
    connection.end();
}