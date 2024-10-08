import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/AdminSupportList.css'; // Your CSS file path here
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AdminSupportList = () => {

    const [requestList, setRequestList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Start with the first page
    const [pageSize] = useState(10); // Page size
    const isLastPage = requestList.length < pageSize;
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('admin@mydocvisit.com');
    

    useEffect(() => {
        fetchRequests();
      
    }, [ currentPage, pageSize]); // Pass navigate as a dependency if you are using it
  
    const fetchRequests = async () => {
      try {
       const response = await axios.get(`http://localhost:8083/api/technical-requests?page=${currentPage}&size=${pageSize}`);
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
   
    
const viewRequest = (request) => {
    navigate('/view-request-comments', { state: { 
      requestId : request.id,
      issueType : request.issueType,
      issueDescription : request.issueDescription,
      status: request.status,
      email : email
     } });
};

 return (
        <div className="request-list-container">
            
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
                <button  onClick={() => navigate('/admin-patient-details')}>
                      Patient Details
                </button> 
    
                <Link to="/doctor-profile">Doctor Profile</Link>
                <Link to="/user-login">Logout</Link>
              </div>
            </nav>
          </header>
          <div className="request-list-section">
          <div className="main-content" >
        <h1>Support Request List</h1>
                <table>
                <thead>
        <tr>
            <th> Request ID</th>
            <th> Patient Email ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Issue Type</th>
            <th>Issue Description</th>
            <th>Created At</th>
            <th>Status</th>

             <th className="actions">Actions</th>
        </tr>
    </thead>
    <tbody>
                        {requestList.map((request) => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.patientEmailId}</td>
                                <td>{request.firstName}</td>
                                <td>{request.lastName}</td>
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
               <button disabled={currentPage === 0} onClick={goToPrevPage} className="pagination-btn previous">Previous</button>
        <button onClick={goToNextPage} className="pagination-btn next" disabled={isLastPage}>Next</button>
      
        
            </div>
            </div>
           
        );
    };
    


export default AdminSupportList;