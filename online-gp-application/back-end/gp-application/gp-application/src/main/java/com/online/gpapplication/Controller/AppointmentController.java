package com.online.gpapplication.Controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.online.gpapplication.Service.AppointmentService;
import com.online.gpapplication.Service.DoctorService;
import com.online.gpapplication.Service.FeedbackService;
import com.online.gpapplication.Model.AdminAppointmentList;
import com.online.gpapplication.Model.Appointment;
import com.online.gpapplication.Model.AppointmentDetails;
import com.online.gpapplication.Model.AppointmentListDTO;
import com.online.gpapplication.Model.Doctor;
import com.online.gpapplication.Model.DoctorAppointmentList;
import com.online.gpapplication.Model.Feedback;
import com.online.gpapplication.Model.FeedbackDTO;
import com.online.gpapplication.Model.RescheduleAppointmentDTO;
import com.online.gpapplication.Model.User;
import com.online.gpapplication.Repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
	
	@Autowired
	private  AppointmentService appointmentService;
	
	@Autowired
	private FeedbackService feedbackService;
	
	@Autowired
	private DoctorService doctorService;

	@Autowired
    private UserRepository userRepository;
    
	@GetMapping("/{emailId}")
	public ResponseEntity<Page<AppointmentListDTO>> getAppointmentsByPatientId(
	    @PathVariable String emailId, 
	    @PageableDefault(size = 10) Pageable pageable) {
	    
	    User user = userRepository.findByEmailId(emailId);
	    Page<AppointmentListDTO> appointmentPage = Page.empty();
	    System.out.println("User :"+user.getEmailId());
	    if (user != null) {
	        appointmentPage = appointmentService.findAllAppointmentsByPatientId(user.getUserId(), pageable);
	    }

	    System.out.println("Appointment Page Size: " + appointmentPage.getSize());
	    return ResponseEntity.ok(appointmentPage);
	}
	
	
	 @PostMapping("/submitFeedback")
	    public ResponseEntity<Feedback> saveFeedback(@RequestBody FeedbackDTO feedback) {
		 System.out.println("Appointment ID"+feedback.getAppointmentId());
	        try {
	            Feedback savedFeedback = feedbackService.saveFeedback(feedback);
	            return ResponseEntity.ok(savedFeedback);
	        } catch (Exception e) {
	            // Log the exception
	            return ResponseEntity.badRequest().build();
	        }
	    }
	 
	 @PostMapping("/reschedule-appointment/{id}")
	  public ResponseEntity<Appointment> rescheduleAppointment(@PathVariable Long id, @RequestBody RescheduleAppointmentDTO appointmentDTO) {
	       Appointment appointment = appointmentService.rescheduleAppointment(appointmentDTO , id);
	       System.out.println("Appointment Details"+appointmentDTO.getAppointmentDate() + appointmentDTO.getAppointmentTime());
	       if(appointment != null) {
	           return ResponseEntity.ok(appointment);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	 
	 @GetMapping("/fetch-appointment/{appointmentId}")
	 public ResponseEntity<RescheduleAppointmentDTO> getAppointmentById(@PathVariable("appointmentId") Long appointmentId ) {
	     System.out.println("Fetching details for appointment ID: " + appointmentId);
	     RescheduleAppointmentDTO appointment =  appointmentService.findByAppointmentId(appointmentId);
	    if(appointment!=null)
	    {
	    	return ResponseEntity.ok(appointment);
	    }
	    else
	    {
	    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	    }

	 }
	 
	 @DeleteMapping("/delete-appointment/{appointmentId}")
	    public ResponseEntity<?> deleteAppointment(@PathVariable Long appointmentId) {
		 System.out.println("Delete Appointment By Appointment ID : "+ appointmentId);
	        try {
	            appointmentService.deleteAppointment(appointmentId);
	            return ResponseEntity.ok().build();
	        } catch (EmptyResultDataAccessException e) {
	            return ResponseEntity.notFound().build();
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting appointment: " + e.getMessage());
	        }
	    }
 
	 @GetMapping("/fetchAppointmentList")
	    public ResponseEntity<Page<AdminAppointmentList>> getAllAppointments(@PathVariable String emailId , Pageable pageable
	    		 ) {
	    	System.out.println(" getAllAppointments API Starts"+emailId);
	    	Page<AdminAppointmentList> appointmentList = Page.empty();
	    	appointmentList = doctorService.findAppointments( pageable);
	    	AdminAppointmentList newCheck = appointmentList.getContent().get(0);
	    	System.out.println("First Name :"+newCheck.getFirstName());
	    	System.out.println("Last Name :"+newCheck.getLastName());
	    	System.out.println("Email ID :"+newCheck.getPatientEmailId());
	    	System.out.println("Appointment List Size :"+ appointmentList.getSize());
	        return ResponseEntity.ok(appointmentList);
	    }
	 
	 @GetMapping("/fetchAppointmentById/{appointmentId}")
	 public ResponseEntity<AppointmentListDTO> fetchAppointmentByAppointmentId (@PathVariable Long appointmentId)
	 {
		 System.out.println(" fetchAppointmentByAppointmentId API Starts"+appointmentId);
		 AppointmentListDTO appointment = appointmentService.fetchAppointmentByAppointmentId (appointmentId);
		 System.out.println("AppointmentDTO "+appointment);
		 return ResponseEntity.ok(appointment);
	 }
	   
	 @GetMapping("/admin-list")
	    public Page<AdminAppointmentList> getAllAdminAppointments(Pageable pageable) {
		 
	        return appointmentService.findAllAdminAppointments(pageable);
	    }
	 
	 @GetMapping("/available-timeslots/{doctorEmailId}/{date}")
	 public ResponseEntity<List<String>> getAvailableTimeSlots(@PathVariable String doctorEmailId, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
	     List<String> availableTimeSlots = appointmentService.findAvailableTimeSlots(doctorEmailId, date);
	     System.out.println("Available Time SLots"+ availableTimeSlots);
	     return ResponseEntity.ok(availableTimeSlots);
	 }

}
