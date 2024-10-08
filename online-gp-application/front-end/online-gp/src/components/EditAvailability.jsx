import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logoimage.jpg';
import UserContext from '../components/UserContext.jsx';
import { format, parseISO } from 'date-fns';
import '../css/EditAvailability.css';

const EditAvailability = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { id, startDate, endDate, reason, doctorEmailId } = location.state || {};
  
  const [availability, setAvailability] = useState({
    startDate: startDate ? parseISO(startDate) : new Date(),
    endDate: endDate ? parseISO(endDate) : new Date(),
    reason: reason || '',
    id: id,
    doctorEmailId : doctorEmailId
  });

  console.log('Doctor Email Id', availability.doctorEmailId);

  // State for user inputs
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
      await axios.put(`http://localhost:8083/api/doctor_unavailability/edit-unavailability/${id}`, {
        unavailableStartDate: formattedStartDate,
        unavailableEndDate: formattedEndDate,
        unavailableReason: inputReason,
      });

      // Update the main state after successful API call
      setAvailability({
        startDate: inputStartDate,
        endDate: inputEndDate,
        reason: inputReason,
        id
      });

      alert('Availability updated successfully!');
      navigate('/holiday-list', { state: { doctorEmailId: doctorEmailId } }); // Navigate back to the holiday list
    } catch (error) {
      console.error('Failed to update availability:', error);
      alert('Failed to update availability.');
    }
  };

  const navigateToHolidayList = () => {
    if (user?.emailId) {
      console.log("Home Page email id", doctorEmailId);
      navigate('/holiday-list', { state: { doctorEmailId: doctorEmailId } });
    } else {
      // Handle the case when user is not logged in or emailId is not available
      console.log('User is not logged in or email ID is undefined');
      navigate('/user-login');
    }
  };

  return (
    <div className="availability-container">
      <header className="header">
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
          </Link>
          {(availability.doctorEmailId) && (
            <div className="welcome-message">
              <p>Welcome, {availability.doctorEmailId}!</p>
            </div>
          )}
          <div className="nav-links">
            <button onClick={() => navigate('/doctor-availability', { state: { doctorEmailId: doctorEmailId } })}>
              Your Availability
            </button>
            <button onClick={() => navigate('/holiday-list', { state: { doctorEmailId: doctorEmailId } })}>
              Holiday List
            </button>
            <button onClick={() => navigate('/doctor-appointment', { state: { doctorEmailId: doctorEmailId } })}>
              Appointments
            </button>
            <button onClick={() => navigate('/patient-details', { state: { doctorEmailId: doctorEmailId } })}>
              Patient Details
            </button>
            <button onClick={() => navigate('/user-login')}>Logout</button>
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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Start Date</label>
            <DatePicker
              selected={inputStartDate}
              onChange={handleStartDateChange}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <DatePicker
              selected={inputEndDate}
              minDate={inputStartDate}
              maxDate={new Date(inputStartDate.getTime() + (4 * 24 * 60 * 60 * 1000))} // 4 days added to the start date
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
          <button type="submit" className="btn btn-secondary btn-lg">Save Changes</button>
          <button type="button" className="btn btn-secondary btn-lg" onClick={navigateToHolidayList}>Prev</button>
        </form>
      </div>
    </div>
  );
};

export default EditAvailability;
