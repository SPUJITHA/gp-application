import React, { useState , useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import UserContext from '../components/UserContext.jsx';
import logoImage from '../assets/logoimage.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PatientTechnicalRequest = () => {
    
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState('');
  const [issueType, setIssueType] = useState('');
  const navigate = useNavigate();

  const handleIssueTypeChange = (event) => {
      setIssueType(event.target.value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission
      if (!user?.emailId) {
          console.log('User is not logged in or email ID is undefined');
          navigate('/user-login');
          return;
      }
      console.log("Issue Description"+ description);
      try {
          const response = await axios.post('http://localhost:8083/api/technical-requests/save', {
              patientEmailId: user.emailId,
              issueDescription: description,
              issueType: issueType
          });
          console.log('Request Raised:', response.data);
          alert('Support request submitted successfully!');
          // Redirect or clear form here
          setDescription('');
          setIssueType('');
      } catch (error) {
          console.error('Error raising request:', error);
          alert('Failed to submit support request.');
      }
  };
// Now, you can safely use `user`
    const userEmail = user?.emailId ?? null;
    const emailId = user?.emailId;
  
    const navigateToAppointments = () => {
        if (user?.emailId) {
          console.log("Home Page email id", user.emailId);
          navigate('/appointment-list', { state: { emailId: user.emailId } });
        } else {
          // Handle the case when user is not logged in or emailId is not available
          console.log('User is not logged in or email ID is undefined');
          navigate('/user-login');
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
        <div className="technical-request-container">
      <header className="home-header">
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
          
            { userEmail && <Link to="/technical-request-list" onClick={navigateToPatientSupportRequests}>Your Support Requests</Link>}
            {/* <button onClick={navigateToAppointments}>Your Bookings</button> */}
            { userEmail && <Link to="/patient-profile-details" onClick ={navigateToPatientProfile}>Profile</Link>}
            { userEmail && <Link to="/wellness-information-hub" onClick = {navigateToInformationHub}> Information Hub</Link>}
            { !userEmail && <Link to="/user-login">Login</Link> }
            { userEmail && <Link to="/user-login">Logout</Link> }
      </div>
      </nav>
      </header>
            <div className="main-content">
                <h1>Raise Technical Support Request</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="issueDescription" className="form-label">Issue Description:</label>
                        <textarea
                            id="issueDescription"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Please enter issue description"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="issueType" className="form-label">Issue Type:</label>
                        <select
                            id="issueType"
                            className="form-select"
                            value={issueType}
                            onChange={handleIssueTypeChange}
                        >
                            <option value="">Select Issue Type</option>
                            <option value="Payment">Payment</option>
                            <option value="Email Notification">Email Notification</option>
                            <option value="Appointment Booking">Appointment Booking</option>
                            <option value="Prescription">Prescription Services</option>
                            <option value="Wellness Information Hub">Wellness Information Hub</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Request</button>
                </form>
            </div>
        </div>
        
    );
};

export default PatientTechnicalRequest;