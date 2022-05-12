import express, {Request, Response} from "express"
import * as bodyParser from 'body-parser';
const app = express();

const auth = require("./routes/mainRoute");

app.get("/", (req: Request, res: Response) =>{
    res.send("hi")
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", auth)
app.listen(3000, () =>{
    console.log('connected to host 3000');
})