import mongoose from 'mongoose';

const SubmissionSchema =  new mongoose.Schema({
    studentName:{type:String,required:true},
    matNo:{type:String,required:true},
    level:{type:String,required:true},
    timeofSubmission:{type:Date,required:true},
    penalty:{type:Number,required:true},
    assignmentSlug:{type:String, required :true}
} 

)
const Submission = mongoose.model("Submission",SubmissionSchema);

export default Submission;