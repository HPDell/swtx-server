"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetInterestViews(req, res, next)
{
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    var params = req.query;

    var queryString = "SELECT * FROM WhuInterest" + 
    " WHERE WhuInterest.Lat > " + params.minLat + " and WhuInterest.Lat < " + params.maxLat + 
    " and WhuInterest.Lng > " + params.minLng + " and WhuInterest.Lng < " + params.maxLng;
    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                InterestViews: []
            });
            return;
        }
        else {
            res.json({
                InterestViews: results
            });
        }
    });
    connection.end();
}
exports.GetInterestViews = GetInterestViews;