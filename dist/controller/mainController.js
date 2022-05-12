"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const fs = require("fs");
const bcryptjs_1 = __importStar(require("bcryptjs"));
const axios = require("axios");
const { sign } = require('jsonwebtoken');
const privateKey = "5776724cd56b4b01a9459eb7e90be3c9";
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  
class TaskController {
}
exports.TaskController = TaskController;
_a = TaskController;
TaskController.Register = async (body) => {
    _a.hash = await (0, bcryptjs_1.hash)(body.password, 12);
    _a.data = { email: body.email, password: _a.hash };
    var newData = JSON.stringify(_a.data);
    await fs.writeFile('data.json', newData, (err) => {
        if (err)
            throw err;
        console.log("New data added");
    });
    const token = await sign(_a.data, "secretKey", { expiresIn: "1 day" });
    return { token: token };
};
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  
TaskController.Login = async (body) => {
    const data = await fs.readFileSync('data.json', 'utf8');
    const jsondata = JSON.parse(data);
    const check = await bcryptjs_1.default.compare(body.password, jsondata.password);
    if (!check) {
        throw new Error("password doesn't match");
        //   return {message: "password not matched"};
    }
    else {
        return { token: await sign(jsondata, "secretKey", { expiresIn: "1 day" }) };
    }
};
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  
TaskController.getNews = async () => {
    var url = 'http://newsapi.org/v2/top-headlines?' +
        'country=in&' +
        'apiKey=5776724cd56b4b01a9459eb7e90be3c9';
    const data = await axios.get(url);
    return data.data.articles;
};
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  
TaskController.searchNews = async (req) => {
    const search = req.body.search;
    var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=5776724cd56b4b01a9459eb7e90be3c9`;
    const data = await axios.get(url);
    return data.data.articles;
};
