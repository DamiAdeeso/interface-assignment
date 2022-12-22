import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv'
import assignmentRouter from './routes/AssignmentRoutes.js'
import submissionRouter from './routes/SubmissionRoutes.js'
import userRouter from './routes/userRoutes.js';
dotenv.config() ;
mongoose.connect("mongodb+srv://test:test1234@cluster0.iiysxey.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Connected to DB")
    
})
.catch((err)=>{
    console.log(err.message)
})

const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/assignments",assignmentRouter);
app.use("/api/submissions",submissionRouter);
app.use("/api/users",userRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,'/frontend/build')));
app.get('*',(req,res)=>
res.sendFile(path.join(__dirname,'/frontend/build/index.html')));

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

app.listen(5001,()=>{
    console.log("server is running on port 5001");
})
