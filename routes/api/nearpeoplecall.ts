/// <reference path="../../typings/index.d.ts" />

import express = require('express');
import mysql = require('mysql');

interface INearPeopleCallParam {
    UserName: string
}

export function nearpeoplecall(req:express.Request, res:express.Response, next:express.NextFunction) {
    var data:INearPeopleCallParam = req.query;
    if (data === undefined) {
        res.json({
            result: false
        })
        return;
    }
    var queryString:string = "SELECT "
}
