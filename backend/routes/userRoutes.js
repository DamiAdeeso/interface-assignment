import express from "express";
import expressAsyncHandler from "express-async-handler";

const userRouter = express.Router();

userRouter.post("/signin",expressAsyncHandler(async(req,res)=>{ console.log(req.body.email , req.body.password);
    if(req.body.email=="test@gmail.com" && req.body.password == "password123"){
        res.status(201).send({message:"Login Succesfull"})
    }else{
        res.status(401).send({message:"Wrong email or Password"})
    }
}))

export default userRouter;