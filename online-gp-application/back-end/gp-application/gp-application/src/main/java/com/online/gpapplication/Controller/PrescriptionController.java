package com.online.gpapplication.Controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

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

import com.online.gpapplication.Model.AppointmentListDTO;
import com.online.gpapplication.Model.Prescription;
import com.online.gpapplication.Model.PrescriptionDTO;
import com.online.gpapplication.Model.PrescriptionDoctorDTO;
import com.online.gpapplication.Service.PrescriptionService;

import jakarta.transaction.Transactional;

import com.online.gpapplication.Model.PrescriptionItemDTO;
import com.online.gpapplication.Model.PrescriptionServicesListDTO;
import com.online.gpapplication.Model.User;
import com.online.gpapplication.Repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/prescription")
public class PrescriptionController {
	
	@Autowired
	PrescriptionService prescriptionService;
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/save")
	public ResponseEntity<?> savePrescription(@RequestBody PrescriptionDTO prescriptionDTO) {
		System.out.println("Prescription Refill"+ prescriptionDTO.getItems().get(0).getRefillMonths());
	    // Convert DTO to Entities and handle saving logic here
	     prescriptionService.savePrescription(prescriptionDTO);
	    return ResponseEntity.ok().body("Prescription saved successfully!");
	}
	
	 @GetMapping("/{appointmentId}")
	 public ResponseEntity<List<PrescriptionDoctorDTO>> getPrescriptionsByAppointmentId(@PathVariable Long appointmentId) {
		 List<PrescriptionDoctorDTO> prescriptions = prescriptionService.getPrescriptionsByAppointmentId(appointmentId);

		    System.out.println("Prescription DTO size: " + prescriptions.size());
		   
		    if (prescriptions == null || prescriptions.isEmpty()) {
		        System.out.println("No prescriptions found for appointment ID: " + appointmentId);
		        return ResponseEntity.ok(Collections.emptyList()); // Return an empty list
		    }

		    
		    return ResponseEntity.ok(prescriptions); // Return the list of prescriptions
	    }
	 
	 @PostMapping("/update-payment-status")
	    @Transactional
	    public ResponseEntity<String> updatePaymentStatus(@RequestBody Map<String, Object> request) {
	        try {
	        	System.out.println("updatePaymentStatus API "+ request.get("prescriptionId"));
	        	Long prescriptionId = Long.parseLong(request.get("prescriptionId").toString());
	            Prescription prescription = prescriptionService.updatePrescription(prescriptionId);
	            
	            if(prescription != null)
	            {
	            return ResponseEntity.ok("Payment status updated successfully.");
	            } else {
	                return ResponseEntity.status(404).body("Prescription not found.");
	            }
	        } catch (Exception e) {
	            return ResponseEntity.status(500).body("Error updating payment status: " + e.getMessage());
	        }
	    }
	 
	 @GetMapping("/services/{emailId}")
		public ResponseEntity<Page<PrescriptionServicesListDTO>> getPrescriptionsByPatientId(
		    @PathVariable String emailId, 
		    @PageableDefault(size = 10) Pageable pageable) {
		    
		    User user = userRepository.findByEmailId(emailId);
		    Page<PrescriptionServicesListDTO> prescriptionPage = Page.empty();
		    System.out.println("User :"+user.getEmailId());
		    if (user != null) {
		    	prescriptionPage = prescriptionService.getPrescriptionsByPatientId(user.getUserId(), pageable);
		    }

		    System.out.println("Prescription Page Size: " + prescriptionPage.getSize());
		    return ResponseEntity.ok(prescriptionPage);
		}


	 
	 
	}
