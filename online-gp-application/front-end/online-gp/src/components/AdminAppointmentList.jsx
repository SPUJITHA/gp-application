import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../components/UserContext.jsx';
import { useNavigate } from 'react-router-dom'; // import useNavigate if you need to redirect
import { Link } from 'react-router-dom';
import logoImage from '../assets/logoimage.jpg';
import '../css/AdminAppointmentList.css';
import DeleteConfirmationModal from '../components/DeleteConfirmationModel.jsx';

const AdminAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  
  const [totalPages, setTotalPages] = useState(0); // To keep track of total pages
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // Start with the first page
  const [pageSize] = useState(10); // Page size
  const isLastPage = appointments.length < pageSize;
  const [emailId, setEmailId] = useState('admin@mydocvisit.com');
  useEffect(() => {
    fetchAppointments();
  }, [currentPage, pageSize]); // Removed pageSize from dependencies because it's a constant

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/appointments/admin-list?page=${currentPage}&size=${pageSize}`);
      if (response.data) {
        setAppointments(response.data.content);
       
      }
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
const isFutureDate = (dateString) => {
  const today = new Date();
  const appointmentDate = new Date(dateString);
  return appointmentDate > today;
};


// Function to open feedback modal

 
  const navigateToAppointments = () => {
      navigate('/admin-appointment-list');
    };

  
  const handleEdit = (appointment) => {
    navigate(`/reschedule-appointment`, {
      state: {
        appointmentId: appointment.appointmentId,
        doctorName: appointment.doctorName,
        date: appointment.date,
        time: appointment.time,
        symptoms: appointment.symptoms,
        status: appointment.status,
        speciality : appointment.speciality,
        emailId : emailId,
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
        alert('Deleted appointment successfully!');
        setAppointments(currentAppointments => currentAppointments.filter(app => app.appointmentId !== deletingAppointmentId));
      setIsDeleteModalOpen(false); // Close the modal
    } 
  }
      catch (error) {
      console.error('Error deleting appointment', error);
      alert('Failed to submit feedback.');
    }
  };

  const navigateToSupportRequests = () =>
  {
    navigate('/admin-technical-request' , { state: { emailId: userEmail } });
  }
   
  return (
    <div className="adminhomepage">
      <header className="header">
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
          </Link>
          <div className="welcome-message">
            <p>Welcome Admin!</p>
          </div>
          <div className="nav-links">
            <button onClick={() => navigate('/admin-dashboard')}>Home</button>
            {/* <button onClick={() => navigate('/admin-doctor-holiday-list')}>Holiday List</button> */}
            <button onClick={() => navigate('/admin-appointment-list')}>Appointments</button>
            <button onClick={() => navigate('/admin-patient-details')}> Patient Details</button>
            <button  onClick={navigateToSupportRequests}>
                Support Requests
            </button> 
           
            <Link to="/doctor-profile">Doctor Profile</Link>
            <Link to="/user-login">Logout</Link>
          </div>
        </nav>
      </header>
      <div className="bookings-section">
        <div className="main-content">
          <h1>Patient Bookings</h1>
          <table>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Patient Email ID</th>
                <th>Doctor Name</th>
                <th>Doctor Speciality</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                {/* <th>Reschedule</th>
                <th>Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.appointmentId}</td>
                  <td>{appointment.firstName}</td>
                  <td>{appointment.lastName}</td>
                  <td>{appointment.patientEmailId}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.doctorSpeciality}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.status}</td>
                  {/* <td>
                    <button className="update-btn"  onClick={() => handleEdit(appointment)} >Reschedule</button>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => {handleDeleteClick(appointment.appointmentId)}}>Delete</button>
                    <div>
                      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
                      </div>

                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
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
      </div>
    
  );
};

export default AdminAppointmentList;