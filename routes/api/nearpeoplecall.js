"use strict";
/// <reference path="../../typings/index.d.ts" />
exports.__esModule = true;
function nearpeoplecall(req, res, next) {
    var data = req.query;
    if (data === undefined) {
        res.json({
            result: false
        });
        return;
    }
    var queryString = "SELECT ";
}
exports.nearpeoplecall = nearpeoplecall;
