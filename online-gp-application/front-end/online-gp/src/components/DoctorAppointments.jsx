import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import { useLocation } from 'react-router-dom';
import '../css/DoctorAppointment.css';
import { format, parseISO, isSameDay, eachDayOfInterval, addMinutes, isWithinInterval } from 'date-fns';

const DoctorAppointments = () => {
    const navigate = useNavigate();
    const [appointmentDetails, setAppointmentDetails] = useState([]); 
    const location = useLocation();
    const { doctorEmailId } = location.state || {};  
    const {doctorHomeEmailId} = location.state || {};  
    const [currentPage, setCurrentPage] = useState(0); // Start with the first page
    const [pageSize] = useState(10); // Page size
    const isLastPage = appointmentDetails.length < pageSize;
//   const { user } = useContext(UserContext); // Access user from context
//   const doctorEmailId = user?.emailId ?? 'null';  
    console.log("Doctor Email ID: ", doctorEmailId);

useEffect(() => {
    if (doctorEmailId) {
        fetchDoctorAppointmentList(doctorEmailId, currentPage);
    }
}, [doctorEmailId, currentPage, pageSize]); // This will trigger when doctorEmailId, currentPage, or pageSize changes

    const fetchDoctorAppointmentList = async (emailId, page) => {
        try {

          const response = await axios.get(`http://localhost:8083/doctors/fetchAppointmentList/${emailId}?page=${currentPage}&size=${pageSize}`);
          console.log("API Response" ,response.data);
          setAppointmentDetails(response.data.content);
        } catch (error) {
          console.error('Error fetching appointment Details', error);
        }
      };
    
      const goToNextPage = () => {
        const newPage = currentPage + 1;
        console.log("Attempting to go to the next page:", newPage);
        setCurrentPage(newPage);
        fetchDoctorAppointmentList(doctorEmailId, newPage);
      };
      
      const goToPrevPage = () => {
        if (currentPage > 0) {
          const newPage = currentPage - 1;
          console.log("Attempting to go to the previous page:", newPage);
          setCurrentPage(newPage);
          fetchDoctorAppointmentList(doctorEmailId, newPage);
        }
      };
       
      const handleAddPrescriptionClick = (appointment) => {
        navigate('/prescription-form', { state: { 
          appointment: appointment,
            doctorEmailId: doctorEmailId } });
    };

    const handleViewPrescriptionClick = (appointment) => {
      navigate('/doctor-prescription-view', { state: { 
        appointment: appointment,
          doctorEmailId: doctorEmailId } });
  };

  const checkPrescriptionButtonVisibility = (appointmentTime, status) => {
    if (status === 'Completed') {
        return false; // Do not show button if the appointment is completed
    }
    const appointmentStartTime = parseISO(appointmentTime);
    const appointmentEndTime = addMinutes(appointmentStartTime, 30);
    return isWithinInterval(new Date(), { start: appointmentStartTime, end: appointmentEndTime });
};

  return (
        <div class = "appointment-list-container">
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
           <button onClick = {() => navigate('/doctor-homepage', {state : {  doctorEmailId: doctorEmailId } })}> Home </button>
           <button onClick={() => navigate('/doctor-availability', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
            Your Availability
          </button> 
          <button onClick={() => navigate('/holiday-list', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
              Holiday List
            </button> 
          <button  onClick={() => navigate('/patient-details', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
          Patient Details
          </button> 

{/* <Link to={{ pathname: "/doctor-availability", state: { doctorEmailId: doctorEmailId } }}> Your Availability </Link> */}
          {/* <Link to="/doctor-profile">Profile</Link> */}
          <button  onClick={() => navigate('/user-login') }>Logout</button> 
        </div>
            </nav>
          </header>
    
         <div className="appointments-section">
          <div className="main-content">
          <h1>Appointment List</h1>
          <table>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Patient Email ID</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Status</th>
                <th>Symptoms</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(appointmentDetails) && appointmentDetails.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.appointmentId}</td>
                  <td>{appointment.firstName}</td>
                  <td>{appointment.lastName}</td>
                  <td>{appointment.patientEmailId}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.symptoms}</td>
                  <td>
                  {/* {checkPrescriptionButtonVisibility(appointment.appointmentTime. appointment.status) ? (
          <button className="add-prescription" onClick={() => handleAddPrescriptionClick(appointment)}>Add Prescription</button>
        ) : null} */}
        
      {!appointment.prescriptionExists && (
        <button className="add-prescription" onClick={() => handleAddPrescriptionClick(appointment)}>Add Prescription</button>
      )}
        
                    <button className="view-prescription" onClick={() => handleViewPrescriptionClick(appointment)} >View Prescription</button>
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
export default DoctorAppointments;