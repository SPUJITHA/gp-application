package com.online.gpapplication.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.online.gpapplication.Model.AppointmentListDTO;
import com.online.gpapplication.Model.Doctor;
import com.online.gpapplication.Model.DoctorAppointmentList;
import com.online.gpapplication.Model.DoctorFilterDTO;
import com.online.gpapplication.Model.DoctorRegistration;
import com.online.gpapplication.Model.PatientListDTO;
import com.online.gpapplication.Model.Symptoms;
import com.online.gpapplication.Model.User;
import com.online.gpapplication.Service.DoctorService;
import com.online.gpapplication.Service.UserService;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/doctors")
public class DoctorController {
	
	 @Autowired
	    private DoctorService doctorService;
	 
	 @Autowired
	 private UserService userService;

//	    @GetMapping("/filter")
//	    public ResponseEntity<List<DoctorFilterDTO>> getAllDoctors() {
//	        List<DoctorFilterDTO> doctors = doctorService.fetchDoctorsList();
//	        System.out.println(doctors.size());
//	        return ResponseEntity.ok(doctors);
//	    }
//	    
	    @GetMapping ("/fetchSpecialityList")
	    public ResponseEntity<List<String>> fetchSpecialityList() {
	        List<String> specialityList = doctorService.fetchSpecialityList();
	        System.out.println(specialityList.size());
	        return ResponseEntity.ok(specialityList);
	    }
	    
	    @GetMapping("/fetchDoctorsBySpeciality/{speciality}")
	    public ResponseEntity<List<DoctorFilterDTO>> fetchDoctorsBySpeciality(@PathVariable("speciality") String speciality) {
	    	System.out.println("fetchDoctorsBySpeciality API"+ speciality);
	        List<DoctorFilterDTO> doctors = doctorService.fetchDoctorsBySpeciality(speciality);
	        System.out.println(doctors.size());
	        return ResponseEntity.ok(doctors);
	    }
	    
	 // Endpoint to fetch a doctor by ID
	    @GetMapping("/{doctorId}")
	    public ResponseEntity<Doctor> getDoctorById(@PathVariable Integer doctorId) {
	        try {
	            Doctor doctor = doctorService.getDoctorById(doctorId);
	            if (doctor != null) {
	                return new ResponseEntity<>(doctor, HttpStatus.OK);
	            } else {
	                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	            }
	        } catch (Exception e) {
	            // Log the exception
	            System.out.println("Error fetching doctor: " + e.getMessage());
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
 
	    // Endpoint to fetch a doctor by ID
	    @GetMapping("/byEmail/{doctorEmailId}")
	    public ResponseEntity<Long> getDoctorIdByEmailId(@PathVariable String doctorEmailId) {
	        try {
	            Doctor doctor = doctorService.getDoctorByEmailId(doctorEmailId);
	            if (doctor != null) {
	                return new ResponseEntity<>(doctor.getDoctorId(), HttpStatus.OK);
	            } else {
	                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	            }
	        } catch (Exception e) {
	            // Log the exception
	            System.out.println("Error fetching doctor: " + e.getMessage());
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	    
	    @GetMapping("/fetchAppointmentList/{emailId}")
	    public ResponseEntity<Page<DoctorAppointmentList>> getDoctorAppointments(@PathVariable String emailId , Pageable pageable
	    		 ) {
	    	System.out.println(" getDoctorAppointments API Starts"+emailId);
	    	Doctor doctor = doctorService.getDoctorByEmailId(emailId);
	    	System.out.println("Doctor :"+doctor.getDoctorId());
	    	Page<DoctorAppointmentList> appointmentList = Page.empty();
	    	appointmentList = doctorService.findAppointmentsByDoctorId(doctor.getDoctorId(), pageable);
	    	DoctorAppointmentList newCheck = appointmentList.getContent().get(0);
	    	System.out.println("First Name :"+newCheck.getFirstName());
	    	System.out.println("Last Name :"+newCheck.getLastName());
	    	System.out.println("Email ID :"+newCheck.getPatientEmailId());
	    	System.out.println("Appointment List Size :"+ appointmentList.getSize());
	        return ResponseEntity.ok(appointmentList);
	    }
	    
	   
	    @PostMapping("/add")
	    public ResponseEntity<Doctor> addDoctor(@RequestBody DoctorRegistration registration) {
	        User newUser = userService.saveUser(registration.getUser());
	        Doctor doctor = registration.getDoctor();
	        doctor.setUserId(newUser.getUserId());
	        doctor.setEmailId(newUser.getEmailId());
	        Doctor savedDoctor = doctorService.saveDoctor(doctor);
	        return ResponseEntity.ok(savedDoctor);
	    }

	    @GetMapping("/speciality-list")
	    public ResponseEntity<List<Symptoms>> getAllSpecialities() {
	        List<Symptoms> specialities = doctorService.getAllSpecialities();
	        System.out.println("getAllSpecialities :"+ specialities);
	        return ResponseEntity.ok(specialities);
	    }
	    
	    @GetMapping("/doctor-speciality-list")
	    public ResponseEntity<List<String>> getAllDoctorSpecialities() {
	        List<String> specialities = doctorService.getAllDoctorSpecialities();
	        System.out.println("getAllDoctorSpecialities :"+ specialities);
	        return ResponseEntity.ok(specialities);
	    }
	   
}
