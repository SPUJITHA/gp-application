package com.online.gpapplication.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.online.gpapplication.Model.Doctor;
import com.online.gpapplication.Model.DoctorAvailability;
import com.online.gpapplication.Model.DoctorAvailabilityDTO;
import com.online.gpapplication.Model.DoctorAvailabilityResponseDTO;
import com.online.gpapplication.Service.DoctorAvailabilityService;
import com.online.gpapplication.Service.DoctorService;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/doctor_availability")
public class DoctorAvailabilityController {

    @Autowired
    private DoctorAvailabilityService service;
    

    @Autowired
    private DoctorService doctorService;

    @PostMapping
    public ResponseEntity<?> saveDoctorAvailability(@RequestBody List<DoctorAvailability> availabilities) {
    	System.out.println("List of Doctor availability"+availabilities);
        service.saveAvailabilities(availabilities);
        return ResponseEntity.ok().build();
    }
    
 // An endpoint to get availability slots by doctorId and date range
    @GetMapping("/fetchAvailabilitySlots")
    public ResponseEntity<?> getAvailability(@RequestParam String doctorEmailId, 
                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
        	System.out.println("getAvailability API call");
        	Doctor doctor = doctorService.getDoctorByEmailId(doctorEmailId);
            List<DoctorAvailabilityResponseDTO> slots = service.findAvailabilityByDoctorAndDateRange(doctor.getDoctorId(), startDate, endDate);
            System.out.println("Slots size"+slots.size());
            return new ResponseEntity<>(slots, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{availabilityId}")
    public ResponseEntity<?> updateAvailability(@PathVariable Integer availabilityId, @RequestBody DoctorAvailability availability) {
        DoctorAvailability updatedAvailability = service.updateAvailability(availabilityId, availability);
        return ResponseEntity.ok(updatedAvailability);
    }

    @DeleteMapping("/{availabilityId}")
    public ResponseEntity<?> deleteAvailability(@PathVariable Integer availabilityId) {
        service.deleteAvailability(availabilityId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/getAvailability/{id}")
    public ResponseEntity<DoctorAvailability> getAvailabilityById(@PathVariable Integer availabilityId) {
        return service.getAvailabilityById(availabilityId)
                .map(availability -> ResponseEntity.ok().body(availability))
                .orElse(ResponseEntity.notFound().build());
    }
}