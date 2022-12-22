import express from "express";
import Submission from "../models/SubmissionModel.js";
import expressAsyncHandler from "express-async-handler";

const submissionRouter = express.Router();

submissionRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
  try{
    const submissions = await Submission.find();
    res.status(201).send(submissions)
  }  catch(err){
    res.status(401).send({message:err.message})
  }
  
    console.log(foundSubmission);
  }) 
);

submissionRouter.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    try { console.log(req.body);
      const newSubmission = await Submission({
        studentName: req.body.studentName,
        matNo: req.body.matNo,
        level:req.body.level,
        timeofSubmission: req.body.timeofSubmission,
        penalty:req.body.penalty,
        assignmentSlug: req.body.assignmentSlug,
      });

      const submission = await newSubmission.save();
      res
        .status(201)
        .send({ submission, message: "Submission Created Succesfully" });
    } catch (err){
        res.status(401).send({message:err.message})
    }
  })
);

export default submissionRouter;
