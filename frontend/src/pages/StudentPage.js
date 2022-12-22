import React,{useState,useEffect, useReducer} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row,Col} from "react-bootstrap";
import Axios from 'axios';

const reducer = (state,action)=>{
  switch(action.type){
    case "FETCH_REQUEST":
      return{...state,loading:true};
    case "FETCH_SUCCESS":
      return{ ...state, assignments: action.payload, loading: false };
    case "FETCH_FAIL":
      return{...state, loading: false, error: action.payload};

    default:
      return state;
    }
}

function StudentPage() {
const [studentName,setStudentName] = useState("");
const[matNo,setMatNo] = useState("");
const [level , setLevel] = useState("");
const [assignmentSlug,setAssignmentSlug] = useState("bxnx");
const [{loading,assignments, error},dispatch] = useReducer(reducer,{
  loading:true,
  assignments:"",
  error:""

});

useEffect(()=>{
  const fetchData= async ()=>{
    dispatch({type:"FETCH_REQUEST"});
    try{
      const results = await Axios.get('api/assignments');
      dispatch({type:"FETCH_SUCCESS",payload:results.data}); 
    }catch(err){
      dispatch({type:'FETCH_FAIL',payload:err.message});
      console.log(err.message)
    }
  }
  fetchData();
},[]);

const submitHandler = async (e)=>{
  e.preventDefault();
  const b = new Date();

  const timeofSubmission =b.toISOString();
  const penalty =0;
  console.log(studentName, matNo,level,timeofSubmission,assignmentSlug)
  try {
    const results = await Axios.post("/api/submissions/create",{
      studentName,
      matNo,
      level,
      timeofSubmission,
      penalty,
      assignmentSlug
    });
    alert("You've Submitted your assignment succesfully")
  }catch(err){
    alert("Something went wrong")
  }
}

  return (
    <div>
      {loading?(<>Loading...</>):error?(<>error</>):(
          <Row>
          <Col>
          <div id='student-div'>
            <h4>Submit your asssingment here</h4>
            <Form  onSubmit={submitHandler}>
          <Form.Group className="mb-3 form-control-md" controlId="formBasicEmail">
            <Form.Label>Student Name</Form.Label>
            <Form.Control type="name" placeholder="Enter your name"
              required
              onChange={(e)=>setStudentName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3 form-control-md" controlId="formBasicEmail">
            <Form.Label>Matric Number</Form.Label>
            <Form.Control type="name" placeholder="Enter Matric Number" 
            required onChange = {(e)=>{setMatNo(e.target.value)}}
            />
          </Form.Group>
          <Form.Group className="mb-3 form-control-md" controlId="formBasicEmail">
          <Form.Label>Level</Form.Label>
            <Form.Select type="name" placeholder="Select your Level"  required
             onChange={(e)=>{
              e.preventDefault();
              setLevel(e.target.value);
             }}>
            <option>Select your level</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={300}>300</option>
            <option value={400}>400</option>
            <option value={500}>500</option>
            <option value={600}>600</option>
            <option value={700}>700</option>
            </Form.Select>
            
          </Form.Group>
          <Form.Select type="name" placeholder="Select Assignment"  required
             onChange={(e)=>{
              e.preventDefault();
              setAssignmentSlug(e.target.value);
             }}>
            <option>Select your Assignment</option>
            {assignments.map((assignment)=>(
              <option key = {assignment._id} value = {assignment.slug}> {assignment.assignmentTitle}</option>
            ))}
            </Form.Select>
          <Form.Group className="mb-3 form-control-md" controlId="formBasicEmail">
            <Form.Label>Upload Assingment</Form.Label>
            <Form.Control type="file" name='time' placeholder=''/>  
          </Form.Group>
        
          <Button variant="primary" type="submit" id = "create-button">
            Submit
          </Button>
          </Form>
        </div>
          </Col>
        </Row>
      )}
         j
    </div>
   
   
    
  );
}

export default StudentPage;
