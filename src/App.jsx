/* eslint-disable no-unused-vars */
// import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RegisterPage from "../src/pages/RegisterPage/RegisterPage";
import Login from "../src/pages/LoginPage/LoginPage";
import Home from "../src/pages/HomePage/HomePage";
import JobPostPage from "../src/pages/JobPostPage/JobPostPage.jsx";
import JobDetails from "../src/pages/JobDetailsPage/JobDetailsPage.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/job-post" element={<ProtectedRoutes Component={JobPostPage} />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
