import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorFilter = ({ onDoctorSelect, onSpecialtySelect }) => {
  const [selectedName, setSelectedName] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8083/doctors/doctor-speciality-list')
      .then(response => {
        setSpecialities(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Error fetching specialities: ' + err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedSpeciality) {
      setIsLoading(true);
      axios.get(`http://localhost:8083/doctors/fetchDoctorsBySpeciality/${selectedSpeciality}`)
        .then(response => {
          // Check if the response has data and it's an array
          if (Array.isArray(response.data)) {
            setDoctors(response.data);
            setIsLoading(false);
          } else {
            // Handle unexpected response format
            console.error('Unexpected response format:', response.data);
            setError('Unexpected response format.');
            setIsLoading(false);
          }
        })
        .catch(err => {
          setError(`Error fetching doctors for specialty ${selectedSpeciality}: ${err.message}`);
          setIsLoading(false);
        });
    } else {
      setDoctors([]);
    }
  }, [selectedSpeciality]);

  const handleDoctorSelection = (e) => {
    const doctorId = e.target.value;
    setSelectedDoctorId(doctorId); // Update the state with the doctor's name
    onDoctorSelect(doctorId); // Update the parent component with the doctor's name
  };
  
  // ... rest of your component
  
  const handleSpecialitySelection = (e) => {
    const speciality = e.target.value;
    setSelectedSpeciality(speciality);
    onSpecialtySelect(speciality); // Inform parent component about selected speciality
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="speciality" className="form-label">Please Select Doctor Speciality:</label>
        <select className="form-select" value={selectedSpeciality} onChange={handleSpecialitySelection}>
          <option value="">Select Speciality</option>
          {specialities.map((speciality, index) => (
            <option key={index} value={speciality}>{speciality}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="doctorName" className="form-label">Please Select Doctor Name:</label>
        <select className="form-select" value={selectedDoctorId} onChange={handleDoctorSelection}>
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctorId} value={doctor.doctorId}>{doctor.doctorName}</option> // Assume the doctor object includes a name property
          ))}
        </select>
      </div>
    </div>
  );
};

export default DoctorFilter;
