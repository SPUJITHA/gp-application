import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import Login from './components/Login';
import NewLogin from './components/NewLogin'
import PatientDashboard from './components/PatientDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserContext from './components/UserContext';
import AppointmentBooking from './components/AppointmentBooking';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorHomePage from './components/DoctorHomePage';
import AdminDashboard from './components/AdminDashboard';
import AppointmentReceipt from './components/AppointmentReceipt';
import AppointmentList from './components/AppointmentList';
import DoctorAvailability from './components/DoctorAvailability';
import EditAvailability from './components/EditAvailability';
// import AvailabilityReceipt from './components/AvailabilityReceipt';
import PatientDetails from './components/PatientDetails';
import PatientProfileDetails from './components/PatientProfileDetails';
import PrescriptionServices from './components/PrescriptionServices';
import DoctorAppointments from './components/DoctorAppointments';
import PrescriptionForm from './components/PrescriptionForm';
import ViewPrescriptionForm from './components/ViewPrescriptionForm';
import Payment from './components/Payment';
import DoctorPrescriptionView from './components/DoctorPrescriptionView';
import WellnessInformationHub from './components/WellnessInformationHub';
import RescheduleAppointment from './components/RescheduleAppointment';
import HolidayList from './components/HolidayList';
import AdminPatientDetails from './components/AdminPatientDetails';
import AdminPatientProfileDetails from './components/AdminPatientProfileDetails';
import AdminHolidayList from './components/AdminHolidayList';
import EditAdminAvailability from './components/EditAdminAvailability';
import AdminAppointmentList from './components/AdminAppointmentList';
import PatientTechnicalRequest from './components/PatientTechnicalRequest';
import ViewAppointmentPrescriptionForm from './components/ViewAppointmentPrescriptionForm';
import TechnicalRequestList from './components/TechnicalRequestList';
import AdminSupportList from './components/AdminSupportList';
import RequestComments from './components/RequestComments';
import DoctorProfile from './components/DoctorProfile';
function App(){
  const [user, setUser] = useState(null);
  // The value object includes both the user state and the setUser function
  // so that you can read and update the user from any component in your app
  const value = { user, setUser };
  return (
    <UserContext.Provider value={value}>
    <Router>
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/user-login" element={<NewLogin />} /> 
      <Route path="/home" element={<HomePage />} /> 
      <Route path="/appointment" element={<AppointmentBooking />} />
      <Route path="/patient-profile-details" element={<PatientProfileDetails />} />
      <Route path="/doctor-homepage" element={<DoctorHomePage />} />
      <Route path="/doctor-availability" element={<DoctorAvailability />} /> 
      {/* <Route path ="/availability-receipt" element={<AvailabilityReceipt/>} /> */}
      {/* <Route path="/doctor-availability/edit/:availabilityId" component={EditAvailability} /> */}
      <Route path="/edit-availability" element={<EditAvailability />} />
      <Route path="/edit-admin-availability" element={<EditAdminAvailability />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path ="/appointment-receipt" element={<AppointmentReceipt/>} />
      <Route path="/home" element={<HomePage />} /> 
      <Route path="/appointment-list" element={<AppointmentList />} /> 
      <Route path="/reschedule-appointment" element={<RescheduleAppointment />}  />
      <Route path ="/patient-details" element ={<PatientDetails />} />
      <Route path = "/doctor-appointment"  element ={<DoctorAppointments />} />
      <Route path = "/prescription-services"  element ={<PrescriptionServices />} />
      <Route path = "/prescription-form"  element ={<PrescriptionForm />} />
      <Route path = "/view-prescription-form"  element ={<ViewPrescriptionForm />} />
      <Route path = "/view-appointment-prescription-form"  element ={<ViewAppointmentPrescriptionForm />} />
      <Route path = "/doctor-prescription-view"  element ={<DoctorPrescriptionView />} />
      <Route path = "/holiday-list"  element ={<HolidayList />} />
      <Route path = "/wellness-information-hub"  element ={<WellnessInformationHub />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/admin-patient-details" element={<AdminPatientDetails />} />
      <Route path="/edit-patient-details" element={<AdminPatientProfileDetails />} />
      <Route path="/admin-doctor-holiday-list" element ={<AdminHolidayList />} />
      <Route path="/admin-appointment-list" element ={<AdminAppointmentList />} />
      <Route path="/technical-request" element = {<PatientTechnicalRequest />} />
      <Route path ="/technical-request-list" element = {<TechnicalRequestList />} />
      <Route path ="/admin-technical-request" element = {<AdminSupportList />} />
      <Route path ="/view-request-comments" element = {<RequestComments /> } />
      <Route path ="/doctor-profile" element = {<DoctorProfile />} />
    </Routes>
  </Router> 
  </UserContext.Provider> 
 );
 
}

export default App;
