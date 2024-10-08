// import React, { useState, useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Calendar from 'react-calendar';
// import axios from 'axios';
// import 'react-calendar/dist/Calendar.css';
// import '../css/Appointment.css'; 
// import UserContext from '../components/UserContext.jsx';
// import logoImage from '../assets/logoimage.jpg';
// import DoctorFilter from '../components/DoctorFilter.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';

// const PatientProfile = () => {
//     const { user } = useContext(UserContext); // Access user from context
//     const userEmail = user?.emailId ?? 'null';
//       const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         dateOfBirth: '',
//         gender: '',
//         phoneNumber: '',
//         addressLine1: '',
//         addressLine2: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         country: '',
//         medicalHistory: '',
//         allergies: '',
//         currentMedication: '',
//       });
    
//       const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevState => ({
//           ...prevState,
//           [name]: value
//         }));
//       };
    
//       const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//           // Assuming the userId is part of the user context
//           const userId = user?.id; // Replace with the correct property name for the user's ID
//           if (!userId) {
//             console.error("User ID is not available.");
//             return;
//           }
      
//           console.log("API Before Call");
//           const response = await axios.post('http://localhost:8083/patient-details/save', { ...formData, userId });
//           console.log(response.data);
//           // Handle success, possibly navigate to another page or show success message
//         } catch (error) {
//           console.error('There was an error saving the patient details', error);
//           // Handle errors, possibly show error message to user
//         }
//       };


//       return (
//         <div className="patient-profile-container">
//           <header className="header">
//           <nav className="navbar">
//               <Link to="/" className="logo" >
//               <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
//               </Link>
//               {user && (
//                 <div className="welcome-message">
//                   <p>Welcome, {userEmail}!</p> 
//                 </div>
//               )}
//               <div className="nav-links">
//                 <Link to="/home">Home</Link>
//                 <Link to="/prescription-services">Prescription Services</Link>
//                 <Link to="/login">Login</Link>
//                 <Link to="/appointment">Book an Appointment</Link>
//                 <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>
//                 <Link to="/patient-profile">Profile</Link>   
//                 { userEmail && <Link to="/login">Logout</Link> }
//               </div>
//             </nav>
//           </header>
           
//         <div className="main-content">
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
//           <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
//           <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" />
//           <select name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//           <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
//           <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" />
//           <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
//           <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
//           <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
//           <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Zip Code" />
//           <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
//           <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Medical History"></textarea>
//           <textarea name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Allergies"></textarea>
//           <textarea name="currentMedication" value={formData.currentMedication} onChange={handleChange} placeholder="Current Medication"></textarea>
//           <button type="submit">Save Profile</button>
//         </form>
//         </div>
//         </div>
//       );
//     };
    
// export default PatientProfile;
