import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/HomePage.css'; // Your CSS file path here
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import doctor1 from '../assets/doctor1.jpg';
import doctor2 from '../assets/doctor2.jpeg';
import doctor3 from '../assets/doctor3.jpeg';
const HomePage = () => {
  // const navigate = useNavigate();

  
  // const { user } = useContext(UserContext);
  // const handleMakeAppointment = () => {
  //   // This function should redirect to the appointment page
  //   console.log("Home Page email id", user.emailId);
  //   navigate('/appointment-list', {state : {emailId : user.emailId}}); // Update the path as per your route setup
  // };
  const handleClick = () => {
    window.location.href = 'C:\Users\pujit\front-end\online-gp\src\components\index.html'; // Change to your desired URL
  };

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userEmail = user?.emailId;
  console.log("User Email", userEmail);
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
    <div className="homepage">
      <header className="home-header">
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
            { userEmail && <Link to="/prescription-services">Prescription Services</Link> }
          
            {/* <button className="appointment-btn" onClick={handleMakeAppointment}>
              Make an Appointment
            </button>
             */}
             { userEmail && <Link to="/appointment">Book an Appointment</Link>}
            {/* <Link to={{ pathname: "/appointment-list", state: { emailId: user?.emailId }}}> Your Bookings </Link> */}
            { userEmail && <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>}
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
      <main className="main-content">
        <section className="hero">
          <h1>Health Care For Your Family</h1>
          <p>In the healthcare sector, service excellence is the facility of the hospital as healthcare service provider to consistently.</p>
          <button className="services-btn" onClick={handleClick} >Check ur Services</button>
        </section>
        <section class="why-us mt-5 mt-md-0">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 d-flex align-items-stretch">
                <div class="content"><h3>Why Choose Us?</h3>
                <p>We are dedicated to maintaining the highest standards of care through continuous improvement and education.</p>
                <div class="text-center"><a href="/" class="more-btn">Learn More <i class="bx bx-chevron-right"></i></a></div></div></div><div class="col-lg-8 d-flex align-items-stretch"><div class="icon-boxes d-flex flex-column justify-content-center"><div class="row"><div class="col-xl-4 d-flex align-items-stretch"><div class="icon-box mt-4 mt-xl-0"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M570.69,236.27,512,184.44V48a16,16,0,0,0-16-16H432a16,16,0,0,0-16,16V99.67L314.78,10.3C308.5,4.61,296.53,0,288,0s-20.46,4.61-26.74,10.3l-256,226A18.27,18.27,0,0,0,0,248.2a18.64,18.64,0,0,0,4.09,10.71L25.5,282.7a21.14,21.14,0,0,0,12,5.3,21.67,21.67,0,0,0,10.69-4.11l15.9-14V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V269.88l15.91,14A21.94,21.94,0,0,0,538.63,288a20.89,20.89,0,0,0,11.87-5.31l21.41-23.81A21.64,21.64,0,0,0,576,248.19,21,21,0,0,0,570.69,236.27ZM288,176a64,64,0,1,1-64,64A64,64,0,0,1,288,176ZM400,448H176a16,16,0,0,1-16-16,96,96,0,0,1,96-96h64a96,96,0,0,1,96,96A16,16,0,0,1,400,448Z"></path></svg><h4>Appointment</h4><small class="text-secondary">24 Hours Service</small><p>24/7 Access to Appointments - Because Your Convenience Matters.</p></div></div><div class="col-xl-4 d-flex align-items-stretch"><div class="icon-box mt-4 mt-xl-0"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"></path></svg><h4>Emegency Cases</h4><h6 class="text-secondary">+88 0165187891</h6><p>Compassionate Care in Critical Moments - Emergency Services You Can Rely On.</p></div></div><div class="col-xl-4 d-flex align-items-stretch"><div class="icon-box mt-4 mt-xl-0"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path></svg><h4>Working Hours</h4><small class="text-secondary">Timing schedule</small><ul class="list-group list-group-flush"><li class="list-group-item d-flex justify-content-between text-nowrap"><p>Sun - Wed : </p> <p>8:00 - 17: 00</p></li><li class="list-group-item d-flex justify-content-between text-nowrap"><p>Thus - Fri : </p> <p>9:00 - 17: 00</p></li><li class="list-group-item d-flex justify-content-between text-nowrap"><p>Sat - Sun : </p> <p>10:00 - 17: 00</p></li></ul></div></div></div></div></div></div></div>
                </section>
    <section className="personal-care">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center">
            <img src={doctor1} alt="Personal Care" className="img-fluid"/>
           </div>
          <div className="col-lg-6">
            <div className="content">
              <h2>Personal care healthy living</h2>
              <p>We provide best leading medical service. Your health and comfort are our priority, with personalized attention and treatments tailored to your unique needs.</p>
              <Link to="/services" className="btn btn-primary">SERVICES</Link>
            </div>
          </div>
        </div>
      </div>
</section> 
      </main>
      </div> );
      
};

export default HomePage;