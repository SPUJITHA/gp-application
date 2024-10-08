import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../components/UserContext.jsx';
import logoImage from '../assets/logoimage.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import  '../css/RequestComments.css';
const RequestComments = () => {
    const location = useLocation();
    const requestId = location.state?.requestId;
    const issueType = location.state?.issueType;
    const issueDescription = location.state?.issueDescription;
    const authorEmail = location.state?.email;
    const status = location.state?.status; // Get the status
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const emailId = user?.emailId;
    const adminEmail = 'admin@mydocvisit.com'; // Admin email for comparison
    const userEmail = user?.emailId;
    useEffect(() => {
        if (requestId) {
            axios.get(`http://localhost:8083/api/comments/getComment/${requestId}`)
                .then(response => {
                    setComments(response.data || []);
                })
                .catch(error => console.error('Error fetching comments', error));
        }
    }, [requestId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const response = await axios.post(`http://localhost:8083/api/comments/addComment/${requestId}`, {
                comment: newComment.trim(),
                authorEmail: authorEmail
            });
            setComments(prevComments => [...prevComments, response.data]);
            setNewComment("");
            alert('Comment added successfully!');
        } catch (error) {
            console.error('Error posting comment', error);
            alert('Failed to submit comment!');
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

      
    const renderAdminHeader = () => (
        <header className="home-header">
            <nav className="navbar">
                <Link to="/" className="logo">
                    <img src={logoImage} alt="Docmed Logo" className="logo-img" />
                </Link>
                <div className="welcome-message">
                    <p>Welcome {authorEmail}</p>
                </div>
                <div className="nav-links">
                    <button onClick={() => navigate('/admin-dashboard')}>Home</button>
                    <button onClick={() => navigate('/admin-appointment-list')}>Appointments</button>
                    <button onClick={() => navigate('/admin-patient-details')}>Patient Details</button>
                    <Link to="/doctor-profile">Doctor Profile</Link>
                    { !userEmail && <Link to="/user-login">Login</Link> }
            { userEmail && <Link to="/user-login">Logout</Link> }
                </div>
            </nav>
        </header>
    );

    const renderPatientHeader = () => (
        <header className="home-header">
            <nav className="navbar">
                <Link to="/" className="logo">
                    <img src={logoImage} alt="Docmed Logo" className="logo-img" />
                </Link>
                {user && (
                    <div className="welcome-message">
                        <p>Welcome, {user.emailId}!</p>
                    </div>
                )}
                <div className="nav-links">
                    <Link to="/home">Home</Link>
                    <Link to="/prescription-services">Prescription Services</Link>
                    <Link to="/appointment">Book an Appointment</Link>
                    <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>
                    <Link to="/technical-request" onClick={navigateToTechnicalRequest}>Raise Support Request</Link>
            <Link to="/technical-request-list" onClick={navigateToPatientSupportRequests}>Your Support Requests</Link>
           
                    <Link to="/patient-profile-details" onClick={() => navigate('/patient-profile-details')}>Profile</Link>
                    <Link to="/wellness-information-hub" onClick={() => navigate('/wellness-information-hub')}>Information Hub</Link>
                    {!userEmail && <Link to="/user-login">Login</Link>}
                    {userEmail && <Link to="/user-login">Logout</Link>}
                </div>
            </nav>
        </header>
    );

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
      
      const updateStatus = async (newStatus) => {
        try {
            const response = await axios.post(`http://localhost:8083/api/technical-requests/updateStatus/${requestId}`, {
                status: newStatus
            });
            if (response.status === 200) {
                alert(`Status updated to ${newStatus}`);
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            alert(`Error updating status: ${error.message}`);
        }
    };
    
    return (
        <div className="request-list-container">
            {authorEmail === adminEmail ? renderAdminHeader() : renderPatientHeader()}
            <div className="main-content">
                <h1>View Conversation</h1>
                <div className="request-details">
                    <p>Request ID: {requestId}</p>
                    <p>Issue Type: {issueType}</p>
                    <p>Issue Description: {issueDescription}</p>
                   <p>Status: {status} </p>
                </div>
                <h2>Comments</h2>
                {comments.map(comment => (
                    <div className="comment-item" key={comment.id}>
                       <b><span className="comment-author">{comment.author.emailId} - </span></b> 
                        <span className="comment-text">{comment.comment}</span>
                    </div>
                ))}
                <div className="mb-3">
                    <label htmlFor="newComment" className="form-label">Add New Comment:</label>
                    <textarea
                        value={newComment} id="newComment" className="form-control"
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
                </div>
                <button onClick={handleAddComment} className="add-comment">Add Comment</button>
                <button  className="cancel-prescription" onClick={handleCancel}>Back to Requests</button>
                
                {authorEmail === adminEmail && status !== "Resolved" && (
                    <>
                        <button onClick={() => updateStatus("Working")} className="working-btn">Set as Working</button>
                        <button onClick={() => updateStatus("Resolved")} className="resolved-btn">Set as Resolved</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RequestComments;
