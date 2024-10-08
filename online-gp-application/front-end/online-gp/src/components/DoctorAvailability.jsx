import React, { useState, useContext , useEffect} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/DoctorAvailability.css';
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import { subDays, isBefore, addDays } from 'date-fns';
import { format, parseISO, isSameDay, eachDayOfInterval } from 'date-fns';



const DoctorAvailability = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { state } = useLocation();
const doctorEmailId = state?.doctorEmailId;
const doctorHomeEmailId = doctorEmailId;
  const location = useLocation();
  const [doctorId, setDoctorId] = useState(null);
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const[reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  console.log(location.state);

  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isUnavailabilitySaved, setIsUnavailabilitySaved] = useState(false); // New state to trigger refresh
// useEffect(() => {
//   // Simulating a fetch call to get unavailable dates
//   const fetchUnavailableDates = async () => {
//     try {
//       // Replace with your actual API call
//       const response = await axios.get('/api/unavailable-dates');
//       const dates = response.data.map(dateString => new Date(dateString));
//       setUnavailableDates(dates);
//     } catch (error) {
//       console.error('Error fetching unavailable dates', error);
//     }
//   };

//   fetchUnavailableDates();
// }, [setUnavailableDates]);

useEffect(() => {
  const fetchUnavailability = async () => {
    if (doctorEmailId) {
        try {
            const response = await axios.get(`http://localhost:8083/api/doctor_unavailability/${doctorEmailId}`);
            console.log("API Response :" , response.data);
            const formattedUnavailableDates = response.data.flatMap(unavailability => {
                const start = parseISO(unavailability.unavailableStartDay);
                const end = parseISO(unavailability.unavailableEndDay);
                return eachDayOfInterval({ start, end });
            });
            setUnavailableDates(formattedUnavailableDates);
        } catch (error) {
            console.error('Error fetching unavailability', error);
        }
    }
};
 

  fetchUnavailability();
}, [doctorEmailId, isUnavailabilitySaved]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert dates to suitable format, e.g., ISO string
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");
    console.log("Doctor Email id", doctorEmailId)
    const body = {
      doctorEmailId: doctorEmailId, // You need to set this from context or another state
      unavailableStartDay: startDate,
      unavailableEndDay: endDate,
      unavailableReason: reason,
    };
  console.log("Response before API call", body);
    try {
      const response = await axios.post('http://localhost:8083/api/doctor_unavailability/', body);
      console.log(response.data);
      setErrorMessage('');
      // Handle success, e.g., show a message or navigate
      if (response && response.data) {
      
          alert ('Your unavailability dates are being saved !!!!');
          setIsUnavailabilitySaved(true);
      }
      
    } catch (error) {
      setErrorMessage('An error occurred');
      alert ('Failed to save unavailability dates',error);
      console.error(error);
      // Handle error, e.g., show error message
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  return (
    <div className="availability-container">
        
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
          

<button onClick={() => navigate('/doctor-homepage', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
  Home
</button> 
<button  onClick={() => navigate('/doctor-appointment', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
               Appointments
            </button>
            <button onClick={() => navigate('/holiday-list', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
              Holiday List
            </button> 
            {/* <Link to="/doctor-profile">Profile</Link> */}
            <button onClick={() => navigate('/patient-details', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
            Patient Details
            </button> 

            <Link to="/user-login">Logout</Link>
          </div>
        </nav>
      </header>

      <div className="main-content" >
        <div className="unavailability-form">
        <form onSubmit={handleSubmit}>
        <h2>Doctor Unavailability</h2>
        <div className='start-date'>
        <label htmlFor="unavailability-start-date">Please select unavailable start date (You can select upto 5 days) </label>
        <DatePicker
  renderCustomHeader={({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div
      style={{
        margin: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </button>
      <span>
        {format(date, "MMMM yyyy")}
      </span>
      <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {">"}
      </button>
    </div>
  )}
  selected={startDate}
  onChange={date => setStartDate(date)}
  minDate={new Date()}
  dateFormat="yyyy/MM/dd" 
  highlightDates={unavailableDates}
  filterDate={date => !unavailableDates.some(unavailableDate => isSameDay(date, unavailableDate))}
/>

</div>
      <div className='end-date'>
        <label htmlFor="unavailability-end-date">Please select unavailable end date:</label>

        <DatePicker
  renderCustomHeader={({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div
      style={{
        margin: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </button>
      <span>
        {format(date, "MMMM yyyy")}
      </span>
      <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {">"}
      </button>
    </div>
  )}
  selected={endDate}
  onChange={date => setEndDate(date)}
  minDate={startDate}
  maxDate={new Date(startDate.getTime() + (4 * 24 * 60 * 60 * 1000))} // 4 days added to the start date
  dateFormat="yyyy/MM/dd" 
  highlightDates={unavailableDates}
  filterDate={date => !unavailableDates.some(unavailableDate => isSameDay(date, unavailableDate))}
/>

      </div>
      <div></div>
      <div className="mb-3">
      <label htmlFor="reason" className="form-label label label-info">Enter unavailability reason:</label>

      <input
  type="text"
  className="form-control"
  id="reason"
  placeholder="Enter unavailability reason:"
  value={reason}
  onChange={handleReasonChange} // Add this line
/>
      </div>
      
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit" className="button-submit" >submit</button>
      </form>
      </div>
      
        {/* This is where you'll display the information beside startDate */}
        {/* Populate this div with whatever content you need to show */}
        {/* <div className="availability-info">
    <h2>Availability Info</h2>
    
      
    </div> */}
    
    
    </div>
    </div>
      
  );
};

export default DoctorAvailability;
