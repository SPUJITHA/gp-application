// import React, { useState, useContext, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../css/Appointment.css'; 
// import { Link , useNavigate } from 'react-router-dom';
// import logoImage from '../assets/logoimage.jpg';
// import UserContext from '../components/UserContext.jsx';

// const AvailabilityReceipt = () => {
//     const navigate = useNavigate();
//   const { user } = useContext(UserContext);
//   const [appointments, setAppointments] = useState([]);
//   const userEmail = user?.emailId ?? null;

//   const location = useLocation();
//   const { startDate, endDate, timeSlot, doctorEmailId } = location.state || {};

//   // Formatting the dates for display
//   const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString() : 'N/A';
//   const formattedEndDate = endDate ? new Date(endDate).toLocaleDateString() : 'N/A';

//   // Function to render appointment details
//   const renderAvailabilityDetails = () => {
//     if (!doctorEmailId && !startDate && !endDate && !timeSlot) {
//         return (
//             <div className="no-details-container">
//                 <p>No availability details found. </p>
//             </div>
//         );
//     } 
//     if (!doctorEmailId) {
//       return (
//           <div className="no-details-container">
//               <p>Please Sign In with your registered EmailID </p>
//           </div>
//       );
//   }
//     else {
//         return (
//             <div className="receipt-details">
//                 <p><strong>Appointment ID:</strong> {appointmentDetails.appointmentId}</p>
//                 <p><strong>Date:</strong> {appointmentDetails.appointmentDate}</p>
//                 <p><strong>Time:</strong> {appointmentDetails.appointmentTime}</p>
//                 <p><strong>Doctor Name:</strong> {doctorName || 'Not selected'}</p>
//                 <p><strong>Speciality:</strong> {speciality || 'Not selected'}</p>
//                 <p><strong>Patient Email ID:</strong> {patientEmailId}</p>
//                 <p><strong>Status:</strong> {appointmentDetails.status}</p>
//                 <p><strong>Symptoms:</strong> {appointmentDetails.symptoms}</p>
//                 <button onClick={() => window.print()}>Print Receipt</button>
//             </div>
//         );
//     }
// };

//   return (
//     <div className="receipt-container">
//             <header className="header">
//                 <nav className="navbar">
//                     <Link to="/" className="logo">
//                         <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
//                     </Link>
//                     {user && (
//                         <div className="welcome-message">
//                             <p>Welcome, {userEmail}!</p> 
//                         </div>
//                     )}
//                     <div className="nav-links">
//                         <Link to="/home">Home</Link>
//                         <Link to="/prescription-services">Prescription Services</Link>
//                         <Link to="/user-login">Login</Link>
//                         <Link to="/appointment">Book an Appointment</Link>
//                         <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>
//                         <Link to="/patient-profile-details">Profile</Link>
//                         { userEmail && <Link to="/user-login">Logout</Link> }
//                     </div>
//                 </nav>
//             </header>
//             <div className="receipt-content">
//                 <h2>Appointment Receipt</h2>
//                 {renderAppointmentDetails()}
                
//             </div>
//         </div>
//     );
// };

// export default AvailabilityReceipt;
