import logo from './logo.svg';
import './App.css';
import Nav from './pages/nav'
import LecturerPage from './pages/LecturerPage';
import StudentPage from "./pages/StudentPage";
import Footer from './components/Footer'
import SigninPage from './pages/SignInPage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Nav/>
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<SigninPage/>} />
          <Route path="/admin" element={<LecturerPage />} />
          <Route path="/submissions" element={<StudentPage />} />
        </Routes>
      </div>

    <Footer/>
     </div>
    </BrowserRouter>
    
  );
}

export default App;
