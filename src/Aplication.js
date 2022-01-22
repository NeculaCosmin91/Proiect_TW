import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server=express();
const router=express.Router();

server.use(express.urlencoded({extended:true}));
server.use(express.json());
server.use(cors());

server.use('/api', router);




var port=process.env.PORT||8070
server.listen(port, function afterStartServer(){
    console.log(`Server port is ${port};`);
});

export {server, router};