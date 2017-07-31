/// <reference path="../../typings/index.d.ts" />
import net = require('net');
import mysql = require('mysql');

interface INearPeopleCallParams {
    UserName:string;
}

class NearPeopleCallMsg {
    statueCode:string;
    userName:string;

    constructor(statue:number, message?:string) {
        
    }
}

/**
 * 启动Socket服务器
 * @param port 端口
 */
export function StartSocketServer(port:number) {
    var server = net.createServer(), clientList = [];
    // 监听连接
    server.on("connection", function (client:net.Socket) {
        // 接收消息
        client.on("data", function (msg:string) {
            try {
                var data:INearPeopleCallParams = JSON.parse(msg);
                
            } catch (error) {
                console.log(error);
            }
            
        })
    })
}