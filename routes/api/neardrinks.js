"use strict";
exports.__esModule = true;
var mysql = require("mysql");
/**
 * 查询结果参数类型
 */
// interface INearPeopleResult {
//     /** 用户名 */     UserName: string;
//     /** 更新时间 */   PositionTime: number;
//     /** 经度 */       PositionLat: number;
//     /** 纬度 */       PositionLng: number;
// }
function NearDrinks(req, res, next) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    var params = req.query;
    
    var queryStrings = "SELECT * FROM Drink" + 
    " WHERE Drink.DrinkLat > " + params.minLat + " and Drink.DrinkLat < " + params.maxLat + 
    " and Drink.DrinkLng > " + params.minLng + " and Drink.DrinkLng < " + params.maxLng;
    connection.query(queryStrings, function (err, results) {
        if (err) {
            res.json({
                neardrinks: []
            });
            return;
        }
        else {
            res.json({
                neardrinks: results
            });
        }
    });
    connection.end();
}
exports.NearDrinks = NearDrinks;