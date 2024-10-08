package com.online.gpapplication.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.online.gpapplication.Model.PatientDetails;
import com.online.gpapplication.Repository.PatientDetailsRepository;

@Service
public class PatientDetailsService {
	
	@Autowired
	PatientDetailsRepository patientDetailsRepository;

    public PatientDetails savePatientDetails(PatientDetails details) {
        return patientDetailsRepository.save(details);
    }

}
