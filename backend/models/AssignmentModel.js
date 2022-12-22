import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        courseTitle:{type:String,required:true,},
        slug:{type:String,required:true,},
        courseCode:{type:String,required:true},
        assignmentTitle:{type:String,required:true},
        deadlineDate:{type:Date,required:true},
        
    }
,
{
    timestamps:true
}
    
)

const Assignment = mongoose.model("assignment",assignmentSchema);

export default Assignment;