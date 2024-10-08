import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logoimage.jpg';
import UserContext from '../components/UserContext.jsx';
import { format, parseISO } from 'date-fns';

const EditAdminAvailability = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(UserContext);
    const { id, startDate, endDate, reason } = location.state || {};
    
    const [availability, setAvailability] = useState({
      startDate: startDate ? parseISO(startDate) : new Date(),
      endDate: endDate ? parseISO(endDate) : new Date(),
      reason: reason || '',
      id: id
    });
    const [inputStartDate, setInputStartDate] = useState(availability.startDate);
    const [inputEndDate, setInputEndDate] = useState(availability.endDate);
    const [inputReason, setInputReason] = useState(availability.reason);
  
    const handleStartDateChange = (date) => {
      setInputStartDate(date);
    };
  
    const handleEndDateChange = (date) => {
      setInputEndDate(date);
    };
  
    const handleReasonChange = (event) => {
      setInputReason(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formattedStartDate = format(inputStartDate, "yyyy-MM-dd");
      const formattedEndDate = format(inputEndDate, "yyyy-MM-dd");
  
      try {
        await axios.get(`http://localhost:8083/api/doctor_unavailability/edit-unavailability/${id}`, {
          unavailableStartDate: formattedStartDate,
          unavailableEndDate: formattedEndDate,
          unavailableReason: inputReason,
          unavailabilityId: id
        });
  
        // Update the main state after successful API call
        setAvailability({
          startDate: inputStartDate,
          endDate: inputEndDate,
          reason: inputReason,
          id
        });
  
        alert('Availability updated successfully!');
        navigate('/admin-doctor-holiday-list'); // Navigate back to the holiday list
      } catch (error) {
        console.error('Failed to update availability:', error);
        alert('Failed to update availability.');
      }
    };
  
    const navigateToHolidayList = () => {
      if (user?.emailId) {
        navigate('/admin-doctor-holiday-list');
      } else {
        console.log('User is not logged in or email ID is undefined');
        navigate('/user-login');
      }
    };
  
    return (
        <div className="holiday-list-container">
        
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
            <button onClick={() => navigate('/doctor-appointment')}>Appointments</button>
            <button  onClick={() => navigate('/admin-patient-details')}>
                  Patient Details
            </button> 

            <Link to="/doctor-profile">Doctor Profile</Link>
            <Link to="/user-login">Logout</Link>
          </div>
        </nav>
      </header>
      <div className="main-content">
          <h1>Edit Availability</h1>
          <h2>Previous Availability Information</h2>
          <div className="confirmation-details">
            <p>Unavailability ID: {availability.id}</p>
            <p>Unavailability Start Date: {format(availability.startDate, 'PP')}</p>
            <p>Unavailability End Date: {format(availability.endDate, 'PP')}</p>
            <p>Reason: {availability.reason}</p>
          </div>
         
            <div className="form-group">
              <label>Start Date</label>
              <DatePicker
                selected={inputStartDate}
                onChange={handleStartDateChange}
                dateFormat="MMMM d, yyyy"
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <DatePicker
                selected={inputEndDate}
                onChange={handleEndDateChange}
                dateFormat="MMMM d, yyyy"
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Enter unavailability reason:</label>
              <input
                type="text"
                className="form-control"
                id="reason"
                placeholder="Enter unavailability reason:"
                value={inputReason}
                onChange={handleReasonChange}
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-lg" onClick={handleSubmit}>Save Changes</button>
            <button type="cancel" className="btn btn-secondary btn-lg" onclick={navigateToHolidayList}>Prev</button>
         
        </div>
      </div>
    );
  };


export default EditAdminAvailability;
