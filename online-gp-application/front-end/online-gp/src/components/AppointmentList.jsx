import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../components/UserContext.jsx';
import { useNavigate } from 'react-router-dom'; // import useNavigate if you need to redirect
import { Link } from 'react-router-dom';
import logoImage from '../assets/logoimage.jpg';
import '../css/AppointmentList.css';
import '../css/FeedbackModal.css';
import FeedbackForm from '../components/FeedbackForm.jsx';
import DeleteConfirmationModal from '../components/DeleteConfirmationModel.jsx';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // if you are using react-router v6
  const userEmail = user?.emailId ?? null;
  const emailId = user?.emailId;
  const [currentPage, setCurrentPage] = useState(0); // Start with the first page
  const [pageSize] = useState(10); // Page size
  const isLastPage = appointments.length < pageSize;
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
const [selectedAppointment, setSelectedAppointment] = useState(null);
const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
const [feedback, setFeedback] = useState({
  rating: 0,
  comments: ''
});

const isFutureDate = (dateString) => {
  const today = new Date();
  const appointmentDate = new Date(dateString);
  return appointmentDate > today;
};

const isPastDate = (dateString) => {
  const today = new Date();
  const appointmentDate = new Date(dateString);
  return appointmentDate < today;
};

// Function to open feedback modal
const openFeedbackModal = (appointmentId) => {
  console.log("Opening feedback for appointment ID:", appointmentId);  // For debugging
  setSelectedAppointmentId(appointmentId);
  setIsFeedbackModalOpen(true);
  setFeedback({
    rating: 0,   // Assuming the rating starts at 0
    comments: '',
    appointmentId: appointmentId
  });
};

 
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  // Function to handle feedback button click
  const openFeedbackForm = () => {
    setIsFeedbackFormVisible(true);
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

  
  useEffect(() => {
    if (!emailId) {
      console.log('No email ID provided, redirecting...');
      // navigate('/user-login'); // Redirect to login or another appropriate route
    } else {
      fetchAppointments(userEmail);
    }
  }, [userEmail, currentPage, pageSize]); // Pass navigate as a dependency if you are using it

  const fetchAppointments = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8083/api/appointments/${emailId}?page=${currentPage}&size=${pageSize}`);
      console.log(response.data);
      setAppointments(response.data.content);
    } catch (error) {
      console.error('Error fetching appointments', error);
    }
  };

  const handleEdit = (appointment) => {
    navigate(`/reschedule-appointment`, {
      state: {
        appointmentId: appointment.appointmentId,
        doctorName: appointment.doctorName,
        date: appointment.appointmentDate,
        time: appointment.appointmentTime,
        symptoms: appointment.symptoms,
        status: appointment.status,
        speciality : appointment.speciality,
        emailId : appointment.patientEmailId,
        doctorEmailId : appointment.doctorEmailId
      }
    });
  };
   
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingAppointmentId, setDeletingAppointmentId] = useState(null);

  const handleDeleteClick = (appointmentId) => {
    setIsDeleteModalOpen(true);
    setDeletingAppointmentId(appointmentId);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8083/api/appointments/delete-appointment/${deletingAppointmentId}`);

      
      if (response.status === 200 || response.status === 201) {
        alert('Cancelled appointment successfully!');
        // setAppointments(currentAppointments => currentAppointments.filter(app => app.appointmentId !== deletingAppointmentId));
      setIsDeleteModalOpen(false); // Close the modal
    } 
  }
      catch (error) {
      console.error('Error deleting appointment', error);
      alert('Failed to submit feedback.');
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
  
  const submitFeedback = async () => {
    // Make sure to add logic to prevent submission if feedback data is incomplete
    if (!feedback.rating || !feedback.comments) {
      alert('Please fill in all the fields');
      return;
    }
    console.log("Appointment ID", selectedAppointmentId);
    const apiUrl = 'http://localhost:8083/api/appointments/submitFeedback'; // Use the correct API URL here
    const payload = {
      appointmentId: selectedAppointmentId, // Make sure you have the appointment ID you want to send feedback for
      rating: feedback.rating,
      comments: feedback.comments,
      // Include other fields if necessary
    };
  
    console.log("Submit Feedback Payload", payload);
    try {
      const response = await axios.post(apiUrl, payload);
      if (response.status === 200 || response.status === 201) {
        alert('Feedback submitted successfully!');
        setIsFeedbackModalOpen(false);
        setFeedback({ // Reset the feedback form
          rating: 0,
          comments: '',
          
        });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    }
  };
  
  const handleViewPrescriptionClick = (appointment) => {
    navigate('/view-appointment-prescription-form', { state: { 
      appointment: appointment,
      patientEmailId: userEmail  } });
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
    <div class = "appointment-list-container">
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
            { userEmail && <Link to="/technical-request" onClick={navigateToTechnicalRequest}>Raise Support Request</Link>}
            { userEmail && <Link to="/technical-request-list" onClick={navigateToPatientSupportRequests}>Your Support Requests</Link>}
            <Link to="/patient-profile-details" onClick ={navigateToPatientProfile}>Profile</Link>
            <Link to="/wellness-information-hub" onClick = {navigateToInformationHub}> Information Hub</Link>
            { !userEmail && <Link to="/user-login">Login</Link> }
            { userEmail && <Link to="/user-login">Logout</Link> }
          </div>
        </nav>
      </header>
     <div className="bookings-section">
      <div className="main-content">
      <h1>Your Bookings</h1>
      <table>
        <thead>
          <tr>
            <th> Appointment ID</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Symptoms</th>
            <th>Reschedule</th>
            <th>Cancel</th>
            <th>Feedback</th>
            <th>View Prescription</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(appointments) && appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.appointmentId}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.speciality}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentTime}</td>
              <td>{appointment.status}</td>
              <td>{appointment.symptoms}</td>
              {isFutureDate(appointment.appointmentDate) ? (
                    <>
                      <td>
                        <button className="update-btn" onClick={() => handleEdit(appointment)}>Reschedule</button>
                      </td>
                      <td>
                      <button onClick={() => handleDeleteClick(appointment.appointmentId)} className="delete-btn">Cancel</button>
                      <div>
                      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
                      </div>

                      </td>
                    </>
                  ) : (
                    <>
                      <td>-</td>
                      <td>-</td>
                    </>
                  )}
                  {isPastDate(appointment.appointmentDate) ? (
                    <>
                     
                  <td>
              <button className="feedback-btn" onClick={() => openFeedbackModal(appointment.appointmentId)}> Submit Feedback </button>
              {isFeedbackModalOpen  && selectedAppointmentId === appointment.appointmentId && (
  <FeedbackForm
    isOpen={isFeedbackModalOpen}
    onClose={() => setIsFeedbackModalOpen(false)}
    onSubmit={submitFeedback}
    feedback={feedback}
    setFeedback={setFeedback}
  />
)}
   </td>
   <td> <button className="view-prescription" onClick={() => handleViewPrescriptionClick(appointment)} >View Prescription</button></td>
   </>
                  ) : (
                    <>
                      <td>-</td>
                      <td>-</td>
                    </>
                  )}
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

export default AppointmentList;
