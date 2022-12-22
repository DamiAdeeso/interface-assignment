import express from "express";
import expressAsyncHandler from "express-async-handler";
import Assignment from "../models/AssignmentModel.js";


const assignmentRouter = express.Router();

assignmentRouter.get("/",expressAsyncHandler(async(req,res)=>{
    const assignments = await Assignment.find();
    assignments?res.send(assignments):""
    
}))


assignmentRouter.post("/create",expressAsyncHandler(async(req,res)=>{ 
try{
    const newAssignment = await Assignment(
        {
            courseTitle:req.body.courseTitle,
            slug:req.body.slug,
            courseCode:req.body.courseCode,
            assignmentTitle:req.body.assignmentTitle,
            deadlineDate:req.body.postDate,
        }
    )

    const assignment = await newAssignment.save();

    res.status(201).send({assignment,message:"Assignment Created Succesfully"})
} catch(err){
    res.status(401).send({message:err.message})
}   

}))

export default assignmentRouter;