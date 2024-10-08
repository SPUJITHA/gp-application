import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import '../css/Appointment.css';
import UserContext from '../components/UserContext.jsx';
import logoImage from '../assets/logoimage.jpg';
import { Link } from 'react-router-dom';
import '../css/RescheduleAppointment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RescheduleAppointment = () => {
    const [updatedDate, setUpdatedDate] = useState(new Date());
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(UserContext);
    const userEmail = user?.emailId ?? 'null';
    const [currentStep, setCurrentStep] = useState(0);
    const [appointmentData, setAppointmentData] = useState({
        date: new Date(),
        time: '',
        doctorId: '',
        symptoms: '',
        speciality: '',
        appointmentId: '',
        emailId: '',
        doctorEmailId: ''
    });
    const [updatedTime, setUpdatedTime] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [showDoctorFilter, setShowDoctorFilter] = useState(false);
    const [error, setError] = useState('');
    const [selectedDoctorId, setSelectedDoctorId] = useState();
    const [symptomsText, setSymptomsText] = useState('');
    const times = [
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '14:00 PM', '14:30 PM', '15:00 PM', '15:30 PM', '16:00 PM', '16:30 PM'
    ];
    const { appointmentId, doctorName, speciality, date, time, symptoms, status, emailId, doctorEmailId } = location.state;
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [unavailableDates, setUnavailableDates] = useState([]);

    useEffect(() => {
        if (appointmentId) {
            setAppointmentData({
                date: new Date(date),
                time,
                doctorName,
                symptoms,
                status,
                appointmentId, 
                emailId,
                speciality,
                doctorEmailId
            });
        }
    }, [appointmentId, date, time, doctorName, speciality, symptoms, status, emailId, doctorEmailId]);

    const tileDisabled = ({ date, view }) => {
        return view === 'month' && unavailableDates.some(d =>
            date.getFullYear() === d.getFullYear() &&
            date.getMonth() === d.getMonth() &&
            date.getDate() === d.getDate()
        );
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month' && unavailableDates.some(d =>
            date.getFullYear() === d.getFullYear() &&
            date.getMonth() === d.getMonth() &&
            date.getDate() === d.getDate()
        )) {
            return 'unavailable';
        }
    };

    useEffect(() => {
        const fetchUnavailableDates = async () => {
            try {
                const response = await axios.get(`http://localhost:8083/api/doctor_unavailability/${appointmentData.doctorEmailId}`);
                const formattedDates = response.data.map(unavailability =>
                    new Date(unavailability.unavailableStartDay)
                );
                setUnavailableDates(formattedDates);
            } catch (error) {
                console.error('Failed to fetch unavailable dates:', error);
            }
        };

        if (appointmentData.doctorEmailId) {
            fetchUnavailableDates();
        }
    }, [appointmentData.doctorEmailId]);

    const handleDateChange = (newDate) => {
        setUpdatedDate(newDate);
        setUpdatedTime(null);
    };

    const handleTimeSlotSelect = (timeSlot) => {
        console.log(timeSlot);
        setUpdatedTime(timeSlot);
    };

    useEffect(() => {
        if (appointmentData.doctorEmailId && updatedDate) {
            const formattedDate = formatDate(updatedDate);
            fetchAvailableTimeSlots(appointmentData.doctorEmailId, formattedDate);
        }
    }, [appointmentData.doctorEmailId, updatedDate]);

    const fetchAvailableTimeSlots = async (doctorEmailId, date) => {
        try {
            const response = await axios.get(`http://localhost:8083/api/appointments/available-timeslots/${doctorEmailId}/${date}`);
            console.log("fetchAvailableTimeSlots:", response.data);
            if (response && response.data) {
                setAvailableTimeSlots(response.data);
            } else {
                setAvailableTimeSlots([]);
            }
        } catch (error) {
            console.error("Failed to fetch time slots:", error);
            setAvailableTimeSlots([]);
        }
    };

    const handleReschedule = () => {
        axios.post(`http://localhost:8083/api/appointments/reschedule-appointment/${appointmentId}`, {
            appointmentDate: formatDate(updatedDate),
            appointmentTime: formatTimeForBackend(updatedTime),
        })
            .then(response => {
                console.log('Appointment rescheduled successfully!');
                navigate('/appointment-receipt', { state: { appointmentDetails: response.data, doctorName: appointmentData.doctorName, speciality: appointmentData.speciality, patientEmailId: userEmail } });
            })
            .catch(error => {
                console.error('Failed to reschedule appointment:', error);
            });
    };

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
            hours = (parseInt(hours, 10) % 12) + 12;
        }

        return `${hours}:${minutes}`;
    };

    const nextStep = () => {
        if (currentStep === 0 && (!symptoms)) {
            alert('Please enter symptoms.');
            return;
        }
        if (currentStep === 1 && !updatedTime) {
            alert('Please select a time slot.');
            return;
        }
        if (currentStep < 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleReschedule();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const navigateToAppointments = () => {
        if (user?.emailId) {
            console.log("Home Page email id", user.emailId);
            navigate('/appointment-list', { state: { emailId: user.emailId } });
        } else {
            console.log('User is not logged in or email ID is undefined');
            navigate('/user-login');
        }
    };

    const navigateToPatientProfile = () => {
        if (user?.emailId) {
            console.log("Home Page email id", user.emailId);
            navigate('/patient-profile-details', { state: { emailId: user.emailId } });
        } else {
            console.log('User is not logged in or email ID is undefined');
            navigate('/user-login');
        }
    };

    const navigateToInformationHub = () => {
        if (user?.emailId) {
            console.log("Home Page email id", user.emailId);
            navigate('/wellness-information-hub', { state: { emailId: user.emailId } });
        } else {
            console.log('User is not logged in or email ID is undefined');
            navigate('/user-login');
        }
    };

    const navigateToTechnicalRequest = () => {
        if (user?.emailId) {
            console.log("Home Page email id", user.emailId);
            navigate('/technical-request', { state: { emailId: user.emailId } });
        } else {
            console.log('User is not logged in or email ID is undefined');
            navigate('/user-login');
        }
    };

    const navigateToPatientSupportRequests = () => {
        if (user?.emailId) {
            console.log("Home Page email id", user.emailId);
            navigate('/technical-request-list', { state: { emailId: user.emailId } });
        } else {
            console.log('User is not logged in or email ID is undefined');
            navigate('/user-login');
        }
    };

    return (
        <div className="reschedule-appointment-container">
            <header className="header">
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
                        { !userEmail && <Link to="/user-login">Login</Link> }
                        <Link to="/appointment">Book an Appointment</Link>
                        <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>
                        { userEmail && <Link to="/technical-request" onClick={navigateToTechnicalRequest}>Raise Support Request</Link>}
                        { userEmail && <Link to="/technical-request-list" onClick={navigateToPatientSupportRequests}>Your Support Requests</Link>}
                        { userEmail && <Link to="/patient-profile-details" onClick ={navigateToPatientProfile}>Profile</Link>}
                        { userEmail && <Link to="/wellness-information-hub" onClick = {navigateToInformationHub}>Information Hub</Link>}
                        { !userEmail && <Link to="/user-login">Login</Link> }
                        { userEmail && <Link to="/user-login">Logout</Link> }
                    </div>
                </nav>
            </header>
            <div className="reschedule-main-content">
                <h1>Reschedule Appointment</h1>
                <h2>Previous Appointment Confirmation</h2>
                <div className="confirmation-details">
                    <p>Appointment ID : {appointmentData.appointmentId}</p>
                    <p>Date: {appointmentData.date.toDateString() || 'Date not selected'}</p>
                    <p>Time: {appointmentData.time || 'Time not selected'}</p>
                    <p>Doctor: {appointmentData.doctorName || 'Not selected'}</p>
                    <p>Speciality: {appointmentData.speciality || 'Not selected'}</p>
                    <p>Symptoms: {appointmentData.symptoms}</p>
                    <p>Status : {appointmentData.status}</p>
                </div>
                {currentStep === 0 && (
                    <div className="reschedule-step-content">
                        <h2>Select New Date and Time</h2>
                        <div className="reschedule-calendar-container">
                            <Calendar onChange={handleDateChange} value={updatedDate} minDate={appointmentData.date} tileDisabled={tileDisabled} tileClassName={tileClassName} />
                            <p className="note">Grayed-out dates are unavailable for appointments.</p>
                        </div>
                        <div className="reschedule-time-slots-container">
                            <div className="reschedule-time-slots-grid">
                                {times.map((timeSlot, index) => (
                                    <button key={index}
                                       
                                        className={`time-slot ${updatedTime === timeSlot ? 'selected' : ''}`}
                                        onClick={() => handleTimeSlotSelect(timeSlot)}>
                                        {timeSlot}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="step-navigation-container">
                            <button onClick={nextStep} className="btn btn-primary btn-lg">
                                Next
                            </button>
                        </div>
                    </div>
                )}
                {currentStep === 1 && (
                    <div className="reschedule-appointment-confirmation-container">
                        <h2>Confirm Reschedule</h2>
                        <p>Date: {updatedDate.toDateString() || 'Date not selected'}</p>
                        <p>Time: {updatedTime || 'Time not selected'}</p>
                        <div className="step-navigation-container">
                            <button onClick={prevStep} className="btn btn-secondary btn-lg">
                                Prev
                            </button>
                            <button onClick={handleReschedule} className="btn btn-success btn-lg">
                                Confirm Reschedule
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RescheduleAppointment;
