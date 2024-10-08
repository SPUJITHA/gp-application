import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/DoctorHomePage.css'; // Your CSS file path here
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import { useLocation } from 'react-router-dom';
import '../css/PatientList.css';


const PatientDetails = () => {
  const [patientDetails, setPatientDetails] = useState([]); 
const navigate = useNavigate();
const { user } = useContext(UserContext);
const { state } = useLocation();
const doctorEmailId = state?.doctorEmailId;
const doctorHomeEmailId = doctorEmailId;
const location = useLocation();
const [currentPage, setCurrentPage] = useState(0); // Start with the first page
  const [pageSize] = useState(10); // Page size
  const isLastPage = patientDetails.length < pageSize;
  
  useEffect(() => {
    if (!doctorEmailId) {
      console.log('No email ID provided, redirecting...');
      // navigate('/user-login'); // Redirect to login or another appropriate route
    } else {
      fetchPatientDetails();
    }
  }, [currentPage, pageSize]); // Pass navigate as a dependency if you are using it

 
  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/fetchAllPatients?page=${currentPage}&size=${pageSize}`);
      console.log(response.data);
      setPatientDetails(response.data.content);
    } catch (error) {
      console.error('Error fetching patient Details', error);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage => currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <div class = "patient-list-container">
       <header className="header">
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src={logoImage} alt="Docmed Logo" className="logo-img" />
          </Link>
          {doctorEmailId  && (
            <div className="welcome-message">
              <p>Welcome, {doctorEmailId}!</p>
            </div>
          )}
          <div className="nav-links">
          

<button onClick={() => navigate('/doctor-homepage', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
  Home
</button> 
<button onClick={() => navigate('/doctor-availability', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
              Your Availability
            </button> 
            <button onClick={() => navigate('/holiday-list', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
              Holiday List
            </button> 
            
            <button  onClick={() => navigate('/doctor-appointment', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
               Appointments
            </button>
           
            {/* <Link to="/doctor-profile">Profile</Link> */}
            <Link to="/user-login">Logout</Link>
          </div>
        </nav>
      </header>

     <div className="patients-section">
      <div className="main-content">
      <h1>All Patient Details</h1>
      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Of Birth</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Medical History</th>
            <th>Current Medication</th>
            <th>Allergies</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
        {Array.isArray(patientDetails) && patientDetails.map((patient) => (
            <tr key={patient.patientId}>
              <td>{patient.patientId}</td>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.dateOfBirth}</td>
              <td>{patient.email}</td>
              <td>{patient.gender}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.medicalHistory}</td>
              <td>{patient.currentMedication}</td>
              <td>{patient.allergies}</td>
              {/* <td>
                <button className="view-details">View Details</button>
              </td>
               */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
        </div>
      <button 
  disabled={currentPage === 0}
  onClick={goToPrevPage}
  className={`pagination-btn ${currentPage === 0 ? 'disabled' : ''}`}
>
  Previous
</button>

<button 
  onClick={goToNextPage} 
  className={`pagination-btn next ${isLastPage ? 'disabled' : ''}`}
  disabled={isLastPage}
>
  Next
</button>
      </div>
    </div>
  );
};

export default PatientDetails;
