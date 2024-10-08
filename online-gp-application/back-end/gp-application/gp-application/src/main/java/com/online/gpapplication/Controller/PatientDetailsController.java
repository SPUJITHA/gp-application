package com.online.gpapplication.Controller;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.online.gpapplication.Model.PatientDetails;
import com.online.gpapplication.Model.PatientDetailsDTO;
import com.online.gpapplication.Model.PatientListDTO;
import com.online.gpapplication.Service.AppointmentService;
import com.online.gpapplication.Service.PatientDetailsService;
import com.online.gpapplication.Service.PatientService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PatientDetailsController {

	@Autowired
    private PatientService patientService;
	
	 @PostMapping("/patient-details")
	    public ResponseEntity<?> savePatientDetails(@RequestBody PatientDetailsDTO patientDetailsDto) {
		 System.out.println("Patient Details DTO"+ patientDetailsDto.getDateOfBirth());
	        try {
	            PatientDetails patientDetails = patientService.savePatientDetails(patientDetailsDto);
	            return ResponseEntity.ok(patientDetails);
	        } catch (Exception e) {
	            // Handle the exception properly
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }
	 
	 @GetMapping("/patient-details/{emailId}")
	    public ResponseEntity<?> getPatientDetailsByEmail(@PathVariable String emailId) {
	        try {
	            PatientDetails patientDetails = patientService.getPatientDetailsByEmail(emailId);
	            return ResponseEntity.ok(patientDetails);
	        } catch (NoSuchElementException e) {
	            // Not found
	            return ResponseEntity.notFound().build();
	        } catch (Exception e) {
	            // Other exceptions
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }
	 
	 @GetMapping("/fetchAllPatients")
		public ResponseEntity<Page<PatientListDTO>> fetchAllPatients( 
		    @PageableDefault(size = 10) Pageable pageable) {
		    System.out.println("Fetching all patients");
		    Page<PatientListDTO> patientList = Page.empty();
		    patientList = patientService.fetchAllPatients(pageable);
		    

		    System.out.println("Patient Details Size : " + patientList.getSize());
		    return ResponseEntity.ok(patientList);
		}

}
