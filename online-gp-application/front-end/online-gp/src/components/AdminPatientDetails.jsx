import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/DoctorHomePage.css';
import UserContext from '../components/UserContext.jsx';
import logoImage from '../assets/logoimage.jpg';
import '../css/AdminPatientList.css';

const AdminPatientDetails = () => {
  const [patientDetails, setPatientDetails] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const isLastPage = patientDetails.length < pageSize;

  const userEmail = user?.emailId;
  
  useEffect(() => {
    fetchPatientDetails();
  }, [currentPage, pageSize]);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/fetchAllPatients?page=${currentPage}&size=${pageSize}`);
      console.log("Patient Details Response:", response.data);
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

  const navigateToEditProfileDetails = (email) => {
    navigate('/edit-patient-details', { state: { email } });
  };

  const navigateToSupportRequests = () =>
  {
    navigate('/admin-technical-request' , { state: { emailId: userEmail } });
  }
 
  return (
    <div className="patient-list-container">
       
      <header className="header">
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src={logoImage} alt="Docmed Logo" className="logo-img" />
          </Link>
          <div className="welcome-message">
            <p>Welcome Admin!</p>
          </div>
          <div className="nav-links">
            <button onClick={() => navigate('/admin-dashboard')}>Home</button>
            {/* <button onClick={() => navigate('/admin-doctor-holiday-list')}>Holiday List</button> */}
            <button onClick={() => navigate('/admin-appointment-list')}>Appointments</button>

            <button  onClick={navigateToSupportRequests}>
                Support Requests
            </button> 
           
            <Link to="/doctor-profile">Doctor Profile</Link>
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
                <th>Action</th>
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
                  <td>
                    <button className="edit-details" onClick={() => navigateToEditProfileDetails(patient.email)}>Edit Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button disabled={currentPage === 0} onClick={goToPrevPage} className="pagination-btn previous">Previous</button>
        <button onClick={goToNextPage} className="pagination-btn next" disabled={isLastPage}>Next</button>
      </div>
    </div>
  );
};

export default AdminPatientDetails;
