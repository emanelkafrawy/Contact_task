"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainController_1 = require("../controller/mainController");
const routes = require("express").Router();
const isAuth = require("../middleware/isAuth");
module.exports = routes;
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  
routes.post("/register", async (req, res) => {
    try {
        const _t = await mainController_1.TaskController.Register(req.body);
        res.status(200).json(_t);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
//------------------------------------------------------------------------------------------------------------  
routes.post("/login", async (req, res) => {
    try {
        const _t = await mainController_1.TaskController.Login(req.body);
        res.status(200).json(_t);
    }
    catch (err) {
        res.status(500).json({ message: "some thing get wrong" });
    }
});
//------------------------------------------------------------------------------------------------------------  
routes.get("/getnews", async (req, res) => {
    try {
        const _t = await mainController_1.TaskController.getNews();
        res.status(200).json(_t);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
//------------------------------------------------------------------------------------------------------------  
routes.post("/search", async (req, res) => {
    try {
        const _t = await mainController_1.TaskController.searchNews(req);
        res.status(200).json(_t);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  
