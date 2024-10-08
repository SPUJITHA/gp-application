package com.online.gpapplication.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.online.gpapplication.Model.AdminSupportList;
import com.online.gpapplication.Model.Appointment;
import com.online.gpapplication.Model.SupportRequestDTO;
import com.online.gpapplication.Model.SupportRequestList;
import com.online.gpapplication.Model.TechnicalRequest;
import com.online.gpapplication.Repository.TechnicalRequestRepository;
import com.online.gpapplication.Service.TechnicalService;

import java.util.List;
import java.util.Map;

	@RestController
	@RequestMapping("/api/technical-requests")
	public class TechnicalRequestController {
		
	    @Autowired
	    private TechnicalService technicalService;

	    @PostMapping("/save")
	    public ResponseEntity<TechnicalRequest> saveRequest(@RequestBody SupportRequestDTO request) {
	        TechnicalRequest technicalRequest = technicalService.saveSupportRequest(request);
	        if(technicalRequest!=null)
	        {
	        return ResponseEntity.ok(technicalRequest);
	        }
	        else
	        {
	        	 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	        }
	        
	    }
	    
	    @GetMapping("/{email}")
	    public ResponseEntity<Page<SupportRequestList>> getTechnicalRequestsByUserEmail(@PathVariable("email") String email, Pageable pageable) {
	        Page<SupportRequestList> requests = technicalService.getTechnicalRequestsByEmail(email, pageable);
	        return ResponseEntity.ok(requests);
	    }
	    
	    @GetMapping()
	    public ResponseEntity<Page<AdminSupportList>> getAllTechnicalRequests( Pageable pageable) {
	        Page<AdminSupportList> requests = technicalService.getAllTechnicalRequests(pageable);
	        return ResponseEntity.ok(requests);
	    }
	    
	    @PostMapping("/updateStatus/{requestId}")
	    public ResponseEntity<?> updateRequestStatus(@PathVariable Long requestId, @RequestBody Map<String, String> statusUpdate) {
	        try {
	            TechnicalRequest request = technicalService.getRequestById(requestId);
	            if (request != null) {
	                String status = statusUpdate.get("status");
	                request.setStatus(TechnicalRequest.RequestStatus.valueOf(status));
	                technicalService.saveRequest(request);
	                return ResponseEntity.ok(request);
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found");
	            }
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating status: " + e.getMessage());
	        }
	    }



//	    @GetMapping
//	    public List<TechnicalRequest> getAllRequests() {
//	        return repository.findAll();
//	    }
//
//	    @GetMapping("/{patientId}")
//	    public List<TechnicalRequest> getRequestsByPatient(@PathVariable Long patientId) {
//	        return repository.findByPatientId(patientId);
//	    }
	}



