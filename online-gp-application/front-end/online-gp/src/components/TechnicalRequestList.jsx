import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../components/UserContext.jsx';
import { useNavigate } from 'react-router-dom'; // import useNavigate if you need to redirect
import { Link } from 'react-router-dom';
import logoImage from '../assets/logoimage.jpg';

const TechnicalRequestList = () => {

    const { user } = useContext(UserContext);
    const navigate = useNavigate(); // if you are using react-router v6
  const userEmail = user?.emailId ?? null;
  const emailId = user?.emailId;
  const [requestList, setRequestList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Start with the first page
  const [pageSize] = useState(10); // Page size
  const isLastPage = requestList.length < pageSize;
  

  useEffect(() => {
    if (!emailId) {
      console.log('No email ID provided, redirecting...');
      navigate('/user-login'); // Redirect to login or another appropriate route
    } else {
      fetchRequests(userEmail);
    }
  }, [userEmail, currentPage, pageSize]); // Pass navigate as a dependency if you are using it

  const fetchRequests = async (email) => {
    try {
     const response = await axios.get(`http://localhost:8083/api/technical-requests/${email}?page=${currentPage}&size=${pageSize}`);
     // const response = await axios.get(`http://localhost:8083/api/technical-requests/${emailId}`);
      console.log(response.data);
      setRequestList(response.data.content);
    } catch (error) {
      console.error('Error fetching appointments', error);
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
  
  const viewRequest = (request) => {
    navigate('/view-request-comments', { state: { 
      requestId : request.id,
      issueType : request.issueType,
      issueDescription : request.issueDescription,
      email : userEmail
     } });
};

  
return (
<div class = "request-list-container">
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
            <Link to="/prescription-services">Prescription Services</Link>
          
            {/* <button className="appointment-btn" onClick={handleMakeAppointment}>
              Make an Appointment
            </button>
             */}
            <Link to="/appointment">Book an Appointment</Link>
            {/* <Link to={{ pathname: "/appointment-list", state: { emailId: user?.emailId }}}> Your Bookings </Link> */}
            <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>
            {/* <button onClick={navigateToAppointments}>Your Bookings</button> */}
            <Link to="/patient-profile-details" onClick ={navigateToPatientProfile}>Profile</Link>
            <Link to="/wellness-information-hub" onClick = {navigateToInformationHub}> Information Hub</Link>
            { !userEmail && <Link to="/user-login">Login</Link> }
            { userEmail && <Link to="/user-login">Logout</Link> }
          </div>
        </nav>
      </header>
     <div className="request-list-section">
      <div className="main-content">
      <h1>Your Support Requests</h1>
      <table>
        <thead>
          <tr>
            <th> Request ID</th>
            <th>Issue Type</th>
            <th>Issue Description</th>
            <th>Created At</th>
            <th>Status</th>
             <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
        {Array.isArray(requestList) && requestList.map((request) => (
            <tr key={request.requestId}>
              <td>{request.id}</td>
              <td>{request.issueType}</td>
              <td>{request.issueDescription}</td>
              <td>{request.createdAt}</td>
              <td>{request.status}</td>
                     <td>
                     <button className="view-support-request-btn" onClick={() => viewRequest(request)}>View</button>
                      </td>
                      
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
export default TechnicalRequestList;