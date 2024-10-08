import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../components/UserContext.jsx';
import { useNavigate } from 'react-router-dom'; // import useNavigate if you need to redirect
import { Link } from 'react-router-dom';
import logoImage from '../assets/logoimage.jpg';
import '../css/PrescriptionServices.css';
const PrescriptionServices = () => {

  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // if you are using react-router v6
  const userEmail = user?.emailId ?? null;
  const emailId = user?.emailId;
  const [currentPage, setCurrentPage] = useState(0); // Start with the first page
  const [pageSize] = useState(10); // Page size
  const isLastPage = appointments.length < pageSize;
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    if (!emailId) {
      console.log('No email ID provided, redirecting...');
      // navigate('/user-login'); // Redirect to login or another appropriate route
    } else {
      fetchPrescriptions(userEmail);
    }
  }, [userEmail, currentPage, pageSize]); // Pass navigate as a dependency if you are using it

  const fetchPrescriptions = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8083/prescription/services/${emailId}?page=${currentPage}&size=${pageSize}`);
      console.log(response.data);
      setPrescriptions(response.data.content);
    } catch (error) {
      console.error('Error fetching prescriptions', error);
    }
  };
  const navigateToAppointments = () => {
    if (patientEmailId) {
      console.log("Home Page email id", patientEmailId);
      navigate('/appointment-list', { state: { emailId: patientEmailId } });
    } else {
      // Handle the case when user is not logged in or emailId is not available
      console.log('User is not logged in or email ID is undefined');
      navigate('/user-login');
    }
  };

  const navigateToInformationHub = () => {
    if(user?.emailId)
    {
      console.log("Home Page email id", user.emailId);
      navigate('/wellness-information-hub', {state : {emailId : user.emailId}});
    }
    else {
      // Handle the case when user is not logged in or emailId is not available
      console.log('User is not logged in or email ID is undefined');
      navigate('/user-login');
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
  
  const handleViewPrescriptionClick = async (appointmentId) => {
    try {
        console.log("Appointment ID :", appointmentId);
        const response = await axios.get(`http://localhost:8083/api/appointments/fetchAppointmentById/${appointmentId}`);
        const appointment = response.data;
        console.log("Appointment Details :", appointment);
        // Navigate to the View Prescription form with the fetched data
        navigate('/view-prescription-form', { state: { 
            appointment: appointment,
            patientEmailId: userEmail  // Assuming userEmail is defined in the scope
        }});
    } catch (error) {
        console.error('Failed to fetch appointment details:', error);
        // Optionally handle the error e.g., by displaying an error message to the user
    }
};

const navigateToTechnicalRequest = () => {
  if(user?.emailId)
  {
    console.log("Home Page email id", user.emailId);
    navigate('/technical-request', {state : {emailId : user.emailId}});
  }
  else {
    // Handle the case when user is not logged in or emailId is not available
    console.log('User is not logged in or email ID is undefined');
    navigate('/user-login');
  }
};

const navigateToPatientSupportRequests = () => {
  if(user?.emailId)
  {
    console.log("Home Page email id", user.emailId);
    navigate('/technical-request-list', {state : {emailId : user.emailId}});
  }
  else {
    // Handle the case when user is not logged in or emailId is not available
    console.log('User is not logged in or email ID is undefined');
    navigate('/user-login');
  }
};

  return (
    <div class = "appointment-list-container">
      <header className="header">
      <nav className="navbar">
          <Link to="/" className="logo" >
          <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
          </Link>
          {user && (
            <div className="welcome-message">
              <p>Welcome, {userEmail}!</p> 
            </div>
          )}
          <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/appointment">Book an Appointment</Link>
            <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>
            <Link to="/technical-request" onClick={navigateToTechnicalRequest}>Raise Support Request</Link>
            <Link to="/technical-request-list" onClick={navigateToPatientSupportRequests}>Your Support Requests</Link>
            <Link to="/patient-profile-details">Profile</Link>
            <Link to="/wellness-information-hub" onClick = {navigateToInformationHub}> Information Hub</Link>
            { !userEmail && <Link to="/user-login">Login</Link> }
            { userEmail && <Link to="/user-login">Logout</Link> }
          </div>
        </nav>
      </header>
      <div className="prescription-section">
      <div className="main-content">
      <h1>Prescription Services</h1>
      <table>
        <thead>
          <tr>
            <th>Prescription ID</th>
            <th>Appointment ID</th>
            <th>Doctor Name</th>
            <th>Prescription Status</th>
            <th>Payment Status</th>
            <th>Transaction ID</th>
            <th>Tracking Number</th>
            <th>Date Issued</th>
            <th>View Prescription</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(prescriptions) && prescriptions.map((prescription) => (
            <tr key={prescription.prescriptionId}>
              <td>{prescription.prescriptionId}</td>
              <td>{prescription.appointmentId}</td>
              <td>{prescription.doctorName}</td>
              <td>{prescription.status}</td>
              <td>{prescription.paymentStatus}</td>
              <td>{prescription.transactionId}</td>
              <td>{prescription.trackingNumber}</td>
              <td>{prescription.dateIssued}</td>
                     
                  
              <td> <button className="view-prescription" onClick={() => handleViewPrescriptionClick(prescription.appointmentId)} >View Prescription</button></td>
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

        <button onClick={goToNextPage} className="pagination-btn" disabled={isLastPage}>Next</button>
      </div>
    </div>
  );
};



export default PrescriptionServices;
