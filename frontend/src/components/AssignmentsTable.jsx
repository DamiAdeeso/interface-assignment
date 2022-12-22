import { Button } from 'bootstrap';
import Table from 'react-bootstrap/Table';

function BasicExample() {
  return (
    
    <div id = "table-div">
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Course Code</th>
          <th>Level</th>
          <th>Assingment Title</th>
          <th>Number of Submissions</th>
          <th>Submission Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>ECE 512</td>
          <td>500</td>
          <td>Array Factor</td>
          <td>55/60</td>
          <td ><button  className='closed-button'>closed</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>ECE 401</td>
          <td>400</td>
          <td>Circuits</td>
          <td>4/78</td>
          <td><button className='open-button'button>open</button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>ECE 512</td>
          <td>500</td>
          <td>Module 5 Summary</td>
          <td>58/60</td>
          <td><button  className='closed-button'>closed</button></td>
          
        </tr>
        <tr>
          <td>4</td>
          <td>ECE 401</td>
          <td>400</td>
          <td>Class Summary</td>
          <td>17/78</td>
          <td><button  className='open-button'>open</button></td>
        </tr>
      </tbody>
    </Table>
    </div>
    
  );
}

export default BasicExample;