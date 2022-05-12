import {TaskController} from "../controller/mainController"
const routes = require("express").Router();
const isAuth = require("../middleware/isAuth")
module.exports = routes;
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  

routes.post("/register", async(req: any, res: any) => {
    try{        
        const _t = await TaskController.Register(req.body)

        res.status(200).json(_t)
    }catch(err: any){
        res.status(500).json(err)
    }
})
//------------------------------------------------------------------------------------------------------------  
routes.post("/login", async(req: any, res: any) => {
    try{        
        const _t = await TaskController.Login(req.body)
        
        res.status(200).json(_t)
    }catch(err: any){
        res.status(500).json({message: "some thing get wrong"})
    }
})
//------------------------------------------------------------------------------------------------------------  
routes.get("/getnews", async(req: any, res: any) => {
    try{        
        const _t = await TaskController.getNews()
        
        res.status(200).json(_t)
    }catch(err: any){
        res.status(500).json({message:err})
    }
})
//------------------------------------------------------------------------------------------------------------  
routes.post("/search", async(req: any, res: any) => {
    try{        
        const _t = await TaskController.searchNews(req)
        
        res.status(200).json(_t)
    }catch(err: any){
        res.status(500).json({message:err})
    }
})
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  
