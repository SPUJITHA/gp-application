package com.online.gpapplication.Controller;

import java.time.format.DateTimeParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.online.gpapplication.Model.Appointment;
import com.online.gpapplication.Model.AppointmentDTO;
import com.online.gpapplication.Service.AppointmentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/patient")
public class PatientController {
	
	@Autowired
    private AppointmentService appointmentService;
	
	@PostMapping("/saveAppointment")
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentDTO appointment) {
        Appointment booking = appointmentService.saveAppointment(appointment);
        if(booking!=null)
        {
        return ResponseEntity.ok(booking);
        }
        else
        {
        	 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
	
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<String> handleTimeParseErrors(HttpMessageNotReadableException e) {
	    Throwable cause = e.getCause();
	    if (cause instanceof DateTimeParseException) {
	        return new ResponseEntity<>("Invalid time format. Please submit a time between 00:00 and 23:59.", HttpStatus.BAD_REQUEST);
	    }
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}




}
