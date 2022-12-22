import React, { useReducer, useState ,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TableComponent from "../components/table";
import Axios from "axios";
import AssignmentsTable from "../components/AssignmentsTable";
import { Card, Col, ListGroup, Row, Table } from "react-bootstrap";


const reducer = (state,action)=>{
  switch(action.type){
    case "FETCH_REQUEST":
      return{...state,loading:true};
    case "FETCH_SUCCESS":
      return{...state,assignments:action.payload, loading:false};
    case "FETCH_FAIL":
      return{...state,loadin:false,error:action.payload};

    default:
      return state;
    }
}

let allSubmissions =[];
function BasicExample() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [submissionTime, setSubmissionTime] = useState("submissionTime");
  let tableCount = 0;
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
      console.log(results.data);
      const {data} = await Axios.get('api/submissions');
      allSubmissions=data;
      
      dispatch({type:"FETCH_SUCCESS",payload:results.data});
    }catch(err){
      dispatch({type:'FETCH_FAIL',payload:err.message});
    }
  }
  fetchData();
},[])

  const submitHandler = async (e) => {
    e.preventDefault();
    const slug = `${courseCode}-${assignmentTitle}`;
    const postDate = new Date(
      `${submissionDate} ${submissionTime}`
    ).toISOString();
    try {
      const { data } = await Axios.post("/api/assignments/create", {
        courseTitle,
        slug,
        courseCode,
        assignmentTitle,
        postDate,
      });
      alert("Assignment Created Succesfully!")
    } catch (err) {
      console.log(err.message);
    }
  };

  const exportHandler= async (assignment)=>{
    const objectToCsv = function (data) {
     
      const csvRows = [];
   
      /* Get headers as every csv data format
      has header (head means column name)
      so objects key is nothing but column name
      for csv data using Object.key() function.
      We fetch key of object as column name for
      csv */
      const headers = Object.keys(data[0]);
   
      /* Using push() method we push fetched
         data into csvRows[] array */
      csvRows.push(headers.join(','));
   
      // Loop to get value of each objects key
      for (const row of data) {
          const values = headers.map(header => {
              const val = row[header]
              return `"${val}"`;
          });
   
          // To add, sepearater between each value
          csvRows.push(values.join(','));
      }
   
      /* To add new line for each objects values
         and this return statement array csvRows
         to this function.*/
      return csvRows.join('\n');
  };
   

  //  const slug = assignment.assignmentSlug
  // // Data passed as parameter
  //  const {data} = await Axios.post("api/submissions",{
  //   slug
  //  });
  const download = function (data) {
 
    // Creating a Blob for having a csv file format
    // and passing the data with type
    const blob = new Blob([data], { type: 'text/csv' });
 
    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob)
 
    // Creating an anchor(a) tag of HTML
    const a = document.createElement('a')
 
    // Passing the blob downloading url
    a.setAttribute('href', url)
 
    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute('download', 'download.csv');
 
    // Performing a download with click
    a.click()
}
  let selectSubmissions = allSubmissions.filter((e)=>{
   return e.assignmentSlug == assignment.slug
  })
  console.log(selectSubmissions)
  const csvData = objectToCsv(selectSubmissions);
 download(csvData);
  }
  return (
    <>
     {loading?(<>Loading...</>):error?(<>error</>):(
         <div id="main-div" onSubmit={submitHandler}>
         <h4>Fill form to create a new assignment</h4>
         <Form>
           <Form.Group
             className="mb-3 form-control-sm"
             controlId="formBasicEmail"
           >
             <Form.Label>Course Title</Form.Label>
             <Form.Control
               type="name"
               placeholder="Enter course title"
               requred
               onChange={(e) => setCourseTitle(e.target.value)}
             />
           </Form.Group>
           <Form.Group
             className="mb-3 form-control-sm"
             controlId="formBasicEmail"
           >
             <Form.Label>Course Code</Form.Label>
             <Form.Control
               type="name"
               placeholder="Enter Course Code"
               required
               onChange={(e) => setCourseCode(e.target.value)}
             />
           </Form.Group>
           <Form.Group
             className="mb-3 form-control-sm"
             controlId="formBasicEmail"
           >
             <Form.Label>Assignment Title</Form.Label>
             <Form.Control
               type="name"
               placeholder="Enter assignment title"
               required
               onChange={(e) => setAssignmentTitle(e.target.value)}
             />
           </Form.Group>
           <Form.Group
             className="mb-3 form-control-sm"
             controlId="formBasicEmail"
           >
             <Form.Label>Date of Submission</Form.Label>
             <Form.Control
               type="date"
               name="date_of_birth"
               required
               onChange={(e) => setSubmissionDate(e.target.value)}
             />
           </Form.Group>
           <Form.Group
             className="mb-3 form-control-sm"
             controlId="formBasicEmail"
           >
             <Form.Label>Time of Submission</Form.Label>
             <Form.Control
               type="time"
               name="time"
               placeholder=""
               required
               onChange={(e) => setSubmissionTime(e.target.value)}
             />
           </Form.Group>
 
           <Button variant="primary" type="submit" id="create-button">
             Create assignment
           </Button>
         </Form>
       </div>
     )}
     
     {loading?(<>Loading...</>):error?(<>error</>):(       
           <div id = "table-div">
             <Table striped bordered hover id = "submissions-table">
           <thead>
             <tr>
               <th>S/N</th>
               <th>Assingment Title</th>
               <th>Course Code</th>
               <th>Export Submissions</th>
             </tr>
           </thead>
           <tbody>
           {assignments.map((assignment,i)=>(
                    <tr key = {assignment._id}> 
                    <td>{i+1}</td>
                    <td>{assignment.assignmentTitle}</td>
                    <td>{assignment.courseCode}</td>
                    {/* <td>{assignments.length+1}</td> */}
                    <td><button onClick={()=>{console.log(exportHandler(assignment))}}>Export CSV</button></td>
                  </tr>
                 ))}
           </tbody>
         </Table>
         </div>
     )}
  
j
    </>
  );
}

export default BasicExample;
