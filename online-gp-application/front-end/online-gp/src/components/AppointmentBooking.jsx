import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import '../css/Appointment.css'; 
import UserContext from '../components/UserContext.jsx';
import logoImage from '../assets/logoimage.jpg';
import DoctorFilter from '../components/DoctorFilter.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { subDays, isBefore, addDays } from 'date-fns';
import { format, parseISO, isSameDay, eachDayOfInterval } from 'date-fns';


const AppointmentBooking = () => {  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const { user } = useContext(UserContext); // Access user from context
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  // Check for user and access emailId if user is not null
  const userEmail = user?.emailId ?? 'null';
  const [doctors, setDoctors] = useState([]);
  const [showDoctorFilter, setShowDoctorFilter] = useState(false);
  const [error, setError] = useState('');
  const[selectedDoctorId, setSelectedDoctorId] = useState();
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  
  
  const times = [
    '10:00', '10:30','11:00', '11:30', '12:00', '12:30',
     '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    
  ];
  const navigate = useNavigate();
  // const doctors = [
  //   { id: 1, name: 'Dr. Smith', speciality: 'Cardiology', rating: '4.5' }
  // ];

  const [steps, setSteps] = useState([
    { title: 'Select Doctor and Enter Symptoms', completed: false },
    { title: 'Select Appointment Date & Time', completed: false },
    { title: 'Confirm Appointment', completed: false }
  ]);

  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
  };
  
  const handleFilter = (filteredResults) => {
    setFilteredDoctors(filteredResults);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    console.log(timeSlot);
    setSelectedTimeSlot(timeSlot);
    // if(currentStep === 0)
    // {
    //   setCurrentStep(1);
    // }
    
  };

  const fetchAvailableTimeSlots = async (doctorEmailId, selectedDate) => {
    if (!doctorEmailId) {
      setAvailableTimeSlots(times);
      return;
  }
    try {
        const formattedDate = formatDate(selectedDate);
        const response = await axios.get(`http://localhost:8083/api/appointments/available-timeslots/${doctorEmailId}/${formattedDate}`);
        setAvailableTimeSlots(response.data || []);
    } catch (error) {
        console.error("Failed to fetch time slots:", error);
        setError('Failed to fetch available time slots');
        setAvailableTimeSlots([]);
    }
};


  const handleDoctorSelect = (doctor) => {
    console.log(doctor);
    setSelectedDoctor(doctor);
    if (doctor.emailId) {
      fetchAvailableTimeSlots(doctor.emailId, date);
  }
  };
  
  const handleSymptomsChange = (event) => {
    setSymptoms(event.target.value);
  };

  const handleBookAppointment = () => {
    // Proceed to the confirmation step
    setCurrentStep(2);
  };

  const handleResetTimeSlot = () => {
    setSelectedTimeSlot(null);
  };

  
  const ProgressBar = ({ steps, currentStep }) => {
    return (
      <div className="progress-bar-container">
        {steps.map((step, index) => (
          <div key={index} className={`step ${index === currentStep ? 'active' : ''}`}>
            <div className="step-number">{index + 1}</div>
            <div className="step-title">{step.title}</div>
            {index < steps.length - 1 && <div className="step-divider"></div>}
          </div>
        ))}
      </div>
    );
  };

  const updateStep = (stepIndex) => {
    // Update the completed state of the steps up to the current index
    const updatedSteps = steps.map((step, index) => ({
      ...step,
      completed: index <= stepIndex,
    }));
    setSteps(updatedSteps); // This is the correct way to update the steps in the state
  };

  const nextStep = () => {
    const userEmail = user?.emailId ?? null;
    if (currentStep === 1 && !userEmail) {
      alert('Please sign in with your registered email ID.');
      return;
    }
    if (currentStep === 1 && !selectedTimeSlot) {
      alert('Please select a time slot.');
      return;
    }
    if (currentStep === 0 && (!symptoms)) {
      alert('Please enter symptoms.');
      return;
    }
    if (!isDoctorSelected) {
      setSelectedDoctor('');
      setSelectedSpeciality('');
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save the appointment or handle the completion of the flow here
      saveAppointment();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
const [isDoctorSelected, setIsDoctorSelected] = useState(false);

const handleDoctorCheckboxChange = (e) => {
  const isChecked = e.target.checked;
  setShowDoctorFilter(isChecked);
  setIsDoctorSelected(isChecked);

  // Clear selected doctor if checkbox is unchecked
  if (!isChecked) {
    setSelectedDoctor(null);
  }
};
useEffect(() => {
  if (selectedDoctor) {
    setSelectedDoctorDetails(selectedDoctor)
      // any other fields you need
    }
    else {
      setSelectedDoctorDetails({}); // reset if no doctor is selected
    }
  
  }, [selectedDoctor]);



  const handleDoctorSelectDetails = (doctorId) => {
    setSelectedDoctorId(doctorId);
    // Call the async function and handle the promise it returns
    fetchDoctorName(doctorId).then(doctorObj => {
      if (doctorObj) {
        setSelectedDoctorDetails(doctorObj); // Update the selectedDoctor state with the full doctor object
        console.log("Selected doctor: ", doctorObj);
      } else {
        console.error("Doctor with id " + doctorId + " not found.");
      }
    }).catch(error => {
      console.error("Error fetching doctor: ", error);
    });
  };
  
const handleSpecialtyChange = (speciality) => {
  setSelectedSpeciality(speciality);
};



const [selectedDoctorDetails, setSelectedDoctorDetails] = useState({});
// Add this function to update selected doctor details

const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const formatTimeForBackend = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) % 12) + 12; // Correctly handle noon
  }
  
  return `${hours}:${minutes}`;
};

const saveAppointment = () => {
  console.log('Saving appointment...');

  const formattedDate = formatDate(date); // Use the formatDate function to format the date
  const formattedTime = formatTimeForBackend(selectedTimeSlot);
  console.log('Selected Doctor:', selectedDoctorId);
  console.log('Selected Formatted Time', formattedTime);
  const doctorRequestId = selectedDoctorId;
  console.log('Doctor Request Id', doctorRequestId);
  const appointmentData = {
    date: formattedDate, // Use the formatted date
    time: formattedTime,
    doctorRequestId: doctorRequestId,
    symptoms: symptoms,
    userEmail: userEmail 
  };

  axios.post('http://localhost:8083/patient/saveAppointment', appointmentData)
    .then(response => {
      console.log('Appointment saved:', response);
      navigate('/appointment-receipt', { state: { appointmentDetails: response.data, doctorName: selectedDoctorDetails.doctorName , speciality : selectedSpeciality ,patientEmailId : userEmail } });
      // Handle successful appointment saving, like redirecting to a success page
    })
    .catch(error => {
      console.error('Failed to save appointment:', error);
      // Handle errors, possibly show a message to the user
    });
};
const fetchDoctorName = async (doctorId) => {
  try {
    const response = await axios.get(`http://localhost:8083/doctors/${doctorId}`);
    if (response && response.data) {
      // Just return the doctor object here
      return response.data; 
    } else {
      setError('No doctor found with the provided ID.');

      return null; // Return null to indicate no doctor was found
    }
  } catch (error) {
    setError('Error fetching doctor details:', error);
  }
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
  if  (selectedDoctorDetails && selectedDoctorDetails.emailId) {
    console.log("Selected Doctor Details : ", selectedDoctorDetails);
    fetchDoctorUnavailability(selectedDoctorDetails.emailId);
  }
 else {
  console.log("No doctor selected, skipping fetch for unavailability.");
}
}, [selectedDoctorDetails]);

const fetchDoctorUnavailability = async (doctorEmailId) => {
  console.log("fetchDoctorUnavailability Doctor Email Id :", selectedDoctorDetails.emailId);
  try {
    const response = await axios.get(`http://localhost:8083/api/doctor_unavailability/${selectedDoctorDetails.emailId}`);
    console.log("API Response :", response.data);
    const formattedUnavailableDates = response.data.flatMap(unavailability => {
      const start = unavailability.unavailableStartDay ? parseISO(unavailability.unavailableStartDay) : null;
      const end = unavailability.unavailableEndDay ? parseISO(unavailability.unavailableEndDay) : null;
      if (start && end) {
        return eachDayOfInterval({ start, end });
      } else {
        return [];
      }
    });
    setUnavailableDates(formattedUnavailableDates);
  } catch (error) {
    console.error('Error fetching unavailability', error);
  }
};

const handleDateChange = newDate => {
  
  if (!unavailableDates.some(d => d.toDateString() === newDate.toDateString())) {
    setDate(newDate);
  } else {
    alert('Selected date is unavailable. Please choose another date.');
  }
};



useEffect(() => {
  console.log("Available Time Slots State Updated:", availableTimeSlots);
}, [availableTimeSlots]);
  
useEffect(() => {
  if (selectedDoctorDetails && selectedDoctorDetails.emailId && date) {
    console.log("Date selected in calendar", date);
      fetchAvailableTimeSlots(selectedDoctorDetails.emailId, date);
      
  }
}, [selectedDoctorDetails, date]);

useEffect(() => {
  // Default to all times available when no doctor is selected
  if (!selectedDoctor) {
    setAvailableTimeSlots(times);
  }
}, [selectedDoctor, date]);

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


  return (
    <div className="appointment-booking-container">
      <header className="header">
      <nav className="navbar">
          <Link to="/" className="logo" >
          <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
          </Link>
          {user && (
            <div className="welcome-message">
              <p>Welcome, {userEmail}!</p> 
            </div>
          )}
          <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/prescription-services">Prescription Services</Link>
            { !userEmail && <Link to="/user-login">Login</Link> }
            <Link to="/appointment">Book an Appointment</Link>
            <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>
            { userEmail && <Link to="/technical-request" onClick={navigateToTechnicalRequest}>Raise Support Request</Link>}
            { userEmail && <Link to="/technical-request-list" onClick={navigateToPatientSupportRequests}>Your Support Requests</Link>}
            {/* <button onClick={navigateToAppointments}>Your Bookings</button> */}
            { userEmail && <Link to="/patient-profile-details" onClick ={navigateToPatientProfile}>Profile</Link>}
            { userEmail && <Link to="/wellness-information-hub" onClick = {navigateToInformationHub}> Information Hub</Link>}
            { !userEmail && <Link to="/user-login">Login</Link> }
            { userEmail && <Link to="/user-login">Logout</Link> }
          
          </div>
        </nav>
      </header>
      <div className="main-content">
      {error && <div className="error-message">{error}</div>}

          <ProgressBar steps={steps} currentStep={currentStep} />
        
          {currentStep === 1 && (
            <div className="step-content">
            {/* <div className="calendar-and-slots-container"> */}
              <div className="calendar-container">
              <Calendar
          onChange={handleDateChange}
          value={date}
          tileDisabled={({ date, view }) =>
            (view === 'month' && (
              date < new Date() || 
              unavailableDates.some(d => d.toDateString() === date.toDateString())
            ))
          }
        />
        <p className="note">Grayed-out dates and time-slots are unavailable for appointments.</p>
              </div>
            <div className="time-slots-container">
            <div className="time-slots-grid">
    {times.map((timeSlot, index) => (
        <button key={index}
            disabled={!availableTimeSlots.includes(timeSlot)}
            className={`time-slot ${selectedTimeSlot === timeSlot ? 'selected' : ''}`}
            onClick={() => handleTimeSlotSelect(timeSlot)}>
          {timeSlot}
        </button>
    ))}
    {availableTimeSlots.length === 0 && (
    <p>No available time slots for the selected date. Please choose another date.</p>
)}

</div>

            </div>
               {/* </div>  */}

            
        <div className="step-navigation-container">
        {currentStep > 0 && (
            <button onClick={prevStep} className="btn btn-secondary btn-sm mr-2">
          Prev
        </button>
          )}
  
  {currentStep === 1 && (
    <button 
      onClick={handleResetTimeSlot} 
      className="btn btn-warning btn-sm" 
      disabled={!selectedTimeSlot}>
      Reset
    </button>
  )}
         <button 
            onClick={nextStep} 
            className="btn btn-primary btn-sm" 
            disabled={currentStep === 0 && (!selectedTimeSlot)}>
          {currentStep < steps.length - 1 ? 'Next' : 'Confirm'}
        </button>
      </div>
            </div> 
             
          )}
        
              
        
  {currentStep === 0 && (
    <>
    
      <div className="mb-3">
        <label htmlFor="patientSymptoms" className="form-label">Please enter patient symptoms:</label>
        <input
          type="text"
          className="form-control"
          id="patientSymptoms"
          placeholder="Enter patient symptoms"
          onChange={handleSymptomsChange}
          value={symptoms}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="doctorSelectionCheck"
          checked={isDoctorSelected}
          onChange={handleDoctorCheckboxChange}
        />
        <label className="form-check-label" htmlFor="doctorSelectionCheck">
          Please select the checkbox if you want to select doctor
        </label>
      </div>
  {showDoctorFilter && (
                <DoctorFilter
                
                onDoctorSelect={handleDoctorSelectDetails}
                onSpecialtySelect = {handleSpecialtyChange}
              />              
              
              )} 
              <div className="step-navigation-container">
        {currentStep > 0 && (
          <button onClick={prevStep} className="btn btn-secondary btn-sm mr-2">
            Prev
          </button>
        )}
        <button 
          onClick={nextStep} 
          className="btn btn-primary btn-lg" 
          disabled={currentStep === 1 && (symptoms.trim() === '')}
        >
          Next
        </button>
      </div>
      
          </>
          )}

          {currentStep === 2 && (
            <>
            <div className="appointment-confirmation-container">
              <h2>Appointment Confirmation</h2>
              <div className="confirmation-details">
              <p><b>Date: {date.toDateString()}</b></p>
              <p><b>Time: {selectedTimeSlot || 'Time not selected'}</b></p>
              <p><b>Doctor: {selectedDoctorDetails.doctorName|| 'Not selected'}</b></p>
              <p><b>Specialty: {selectedSpeciality || 'Not selected'}</b></p>
              {/* <p>Rating: {selectedDoctorDetails.rating || 'Not selected'}</p> */}
              <p><b>Symptoms: {symptoms}</b></p>
              </div>
        <div className="step-navigation-container">
        {currentStep > 0 && (
          <button onClick={prevStep} className="btn btn-secondary btn-sm mr-2">
            Prev
          </button>
        )}
              <button onClick={saveAppointment} className="btn btn-primary btn-sm">
                Confirm Appointment
              </button>
              </div>
              </div>
            </>
          )}
          </div>
          </div>
    
  );
};

export default AppointmentBooking;