package com.online.gpapplication.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.online.gpapplication.Model.PatientDetails;
import com.online.gpapplication.Model.PatientDetailsDTO;
import com.online.gpapplication.Model.PatientListDTO;
import com.online.gpapplication.Model.User;
import com.online.gpapplication.Repository.PatientDetailsRepository;
import com.online.gpapplication.Repository.UserRepository;

@Service
public class PatientService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientDetailsRepository patientDetailsRepository;

    public PatientDetails savePatientDetails(PatientDetailsDTO patientDetailsDto) throws Exception {
        // Find the user based on the email ID.
        User user = userRepository.findByEmailId(patientDetailsDto.getEmail());
        if (user == null) {
            throw new Exception("User not found");
        }

        // Try to fetch existing patient details for the user.
        PatientDetails patientDetails = patientDetailsRepository.fetchUserById(user.getUserId());

        // If no patient details exist, create a new PatientDetails object.
        if (patientDetails == null) {
            patientDetails = new PatientDetails();
            patientDetails.setUser(user);
        }

        // Update (or set) the patient details with the provided DTO.
        patientDetails.setFirstName(patientDetailsDto.getFirstName());
        patientDetails.setLastName(patientDetailsDto.getLastName());
        patientDetails.setGender(patientDetailsDto.getGender());
        patientDetails.setEmail(patientDetailsDto.getEmail());
        patientDetails.setDateOfBirth(patientDetailsDto.getDateOfBirth());
        patientDetails.setAddressLine1(patientDetailsDto.getAddressLine1());
        patientDetails.setAddressLine2(patientDetailsDto.getAddressLine2());
        patientDetails.setCity(patientDetailsDto.getCity());
        patientDetails.setState(patientDetailsDto.getState());
        patientDetails.setCountry(patientDetailsDto.getCountry());
        patientDetails.setAllergies(patientDetailsDto.getAllergies());
        patientDetails.setMedicalHistory(patientDetailsDto.getMedicalHistory());
        patientDetails.setPhoneNumber(patientDetailsDto.getPhoneNumber());
        patientDetails.setZipCode(patientDetailsDto.getZipCode());
        patientDetails.setCurrentMedication(patientDetailsDto.getCurrentMedication()); // Assuming this is also in the DTO

        // Save the patient details to the database. This will update existing details or create new ones as necessary.
        return patientDetailsRepository.save(patientDetails);
      }
    
    public PatientDetails getPatientDetailsByEmail(String emailId) throws Exception
    {
    	 User user = userRepository.findByEmailId(emailId);
         if (user == null) {
             throw new Exception("User not found");
         }
         
         // Try to fetch existing patient details for the user.
         PatientDetails patientDetails = patientDetailsRepository.fetchUserById(user.getUserId());

         // If no patient details exist, create a new PatientDetails object.
         if (patientDetails == null) {
             patientDetails = new PatientDetails();
             patientDetails.setUser(user);
             return patientDetails;
         }
         
         else
         {
        	return patientDetails; 
         }


    }
    
    public Page<PatientListDTO> fetchAllPatients(Pageable pageable) {
        return patientDetailsRepository.fetchAllPatients(pageable);
    }
}
