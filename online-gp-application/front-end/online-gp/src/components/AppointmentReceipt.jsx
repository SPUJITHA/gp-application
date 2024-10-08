import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/AppointmentReceipt.css'; 
import { Link , useNavigate } from 'react-router-dom';
import logoImage from '../assets/logoimage.jpg';
import UserContext from '../components/UserContext.jsx';

const AppointmentReceipt = () => {
    
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const userEmail = user?.emailId ?? null;
//   const [currentPage, setCurrentPage] = useState(0); // Start with the first page
//   const [pageSize] = useState(10); // Page size
//   const isLastPage = appointments.length < pageSize;
const location = useLocation();
  const { appointmentDetails, doctorName , speciality, patientEmailId} = location.state || {}; 

    const navigateToAppointments = () => {
        if (user?.emailId) {
          navigate('/appointment-list', { state: { emailId: user.emailId } });
        } else {
          navigate('/user-login');
        }
      };
            
    // Function to render appointment details
    const renderAppointmentDetails = () => {
        if (!appointmentDetails) {
            return (
                <div className="no-details-container">
                    <p>No appointment details found. </p>
                </div>
            );
        } 
        if (!userEmail) {
          return (
              <div className="no-details-container">
                  <p>Please Sign In with your registered EmailID </p>
              </div>
          );
      }
        else {
            return (
                <div className="receipt-details">
                    <p><strong>Appointment ID:</strong> {appointmentDetails.appointmentId}</p>
                    <p><strong>Date:</strong> {appointmentDetails.appointmentDate}</p>
                    <p><strong>Time:</strong> {appointmentDetails.appointmentTime}</p>
                    <p><strong>Doctor Name:</strong> {doctorName || 'Not selected'}</p>
                    <p><strong>Speciality:</strong> {speciality || 'Not selected'}</p>
                    <p><strong>Patient Email ID:</strong> {patientEmailId}</p>
                    <p><strong>Status:</strong> {appointmentDetails.status}</p>
                    <p><strong>Symptoms:</strong> {appointmentDetails.symptoms}</p>
                    <button onClick={() => window.print()} className="print-button">Print Receipt</button>
                </div>
            );
        }
    };
    const navigateToPatientProfile = () => {
        if (user?.emailId) {
          console.log("Home Page email id", user.emailId);
          navigate('/patient-profile-details', { state: { emailId: user.emailId } });
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
        <div className="receipt-container">
           <header className="header">
        <nav className="navbar">
          <Link to="/" className="logo" >
          <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
          </Link>
          {user && (
            <div className="welcome-message">
              <p>Welcome, {user.emailId}!</p> 
            </div>
          )}
          <div className="nav-links">
            <Link to="/home">Home</Link>
            { userEmail && <Link to="/prescription-services">Prescription Services</Link> }
          
            {/* <button className="appointment-btn" onClick={handleMakeAppointment}>
              Make an Appointment
            </button>
             */}
             { userEmail && <Link to="/appointment">Book an Appointment</Link>}
            {/* <Link to={{ pathname: "/appointment-list", state: { emailId: user?.emailId }}}> Your Bookings </Link> */}
            { userEmail && <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>}
            { userEmail && <Link to="/technical-request" onClick={navigateToTechnicalRequest}>Raise Support Request</Link>}
            { userEmail && <Link to="/technical-request-list" onClick={navigateToPatientSupportRequests}>Your Support Requests</Link>}
            {/* <button onClick={navigateToAppointments}>Your Bookings</button> */}
            { userEmail && <Link to="/patient-profile-details" onClick ={navigateToPatientProfile}>Profile</Link>}
            { userEmail && <Link to="/wellness-information-hub" onClick = {navigateToInformationHub}> Information Hub</Link>}
            { !userEmail && <Link to="/user-login">Login</Link> }
            { userEmail && <Link to="/user-login">Logout</Link> }
          </div>
        </nav>
      </header>
       <div className="receipt-content">
                <h2>Appointment Receipt</h2>
                {renderAppointmentDetails()}
                
            </div>
        </div>
    );
};

export default AppointmentReceipt;
