const fs = require("fs")
import bcrypt, { hash } from "bcryptjs";
const axios = require("axios")
const {sign} = require('jsonwebtoken');
const privateKey = "5776724cd56b4b01a9459eb7e90be3c9"
interface IUser{
    email: string,
    password: string
}
interface IToken {
    token : string
}
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  

export class TaskController{
    static salt: string;
    static hash: string;
    static data : IUser

       public static Register =async (body:any): Promise<IToken>=>{

        this.hash = await hash(body.password, 12)
        this.data = {email: body.email, password: this.hash}
        
        var newData = JSON.stringify(this.data);
        await fs.writeFile('data.json', newData, (err: any) => {
            if(err) throw err;
            console.log("New data added");
        });

        const token = await sign(this.data, "secretKey", {expiresIn: "1 day"});
        
        return {token: token};
     }
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  
     public static Login =async (body:any): Promise<IToken>=>{
        const data = await fs.readFileSync('data.json', 'utf8')
        const jsondata =  JSON.parse(data);
        
        const check = await bcrypt.compare(body.password, jsondata.password);          
        if(!check){
            throw new Error("password doesn't match");
        //   return {message: "password not matched"};
        }else{
            return {token: await sign(jsondata, "secretKey", {expiresIn: "1 day"})}
        }
     }    
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  
     public static getNews = async(): Promise<any> =>{
        var url = 'http://newsapi.org/v2/top-headlines?' +
        'country=in&' +
        'apiKey=5776724cd56b4b01a9459eb7e90be3c9';
         const data = await axios.get(url)
         return data.data.articles
     }
//------------------------------------------------------------------------------------------------------------  
//------------------------------------------------------------------------------------------------------------  
     public static searchNews = async(req:any): Promise<any> =>{
         const search = req.body.search
        var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=5776724cd56b4b01a9459eb7e90be3c9`
         const data = await axios.get(url)
         return data.data.articles
     }
}