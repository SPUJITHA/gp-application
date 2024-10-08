package com.online.gpapplication.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

import com.online.gpapplication.Model.Appointment;
import com.online.gpapplication.Model.DoctorUnavailability;
import com.online.gpapplication.Model.DoctorUnavailabilityDTO;
import com.online.gpapplication.Model.DoctorUnavailabilityEditDTO;
import com.online.gpapplication.Model.DoctorUnavailabilityListDTO;
import com.online.gpapplication.Model.RescheduleAppointmentDTO;
import com.online.gpapplication.Service.DoctorService;
import com.online.gpapplication.Service.DoctorUnavailabilityService;

import jakarta.persistence.EntityNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/doctor_unavailability")
public class DoctorUnavailabilityController {

    @Autowired
    private DoctorUnavailabilityService service;
    

    @Autowired
    private DoctorService doctorService;

    @PostMapping("/")
    public ResponseEntity<DoctorUnavailability> saveUnavailability(@RequestBody DoctorUnavailabilityDTO unavailability) {
        return ResponseEntity.ok(service.saveUnavailability(unavailability));
    }
    
    @GetMapping ("/{doctorEmailId}")
    public ResponseEntity<List<DoctorUnavailability>> getUnavailabilityByDoctorId(@PathVariable String doctorEmailId) {
    	System.out.println("Doctor Unavailability Email Id :"+ doctorEmailId);
        List<DoctorUnavailability> unavailabilityList = service.getUnavailabilityByDoctorId(doctorEmailId);
        System.out.println("getUnavailabilityByDoctorId Length : "+ unavailabilityList.size() );
        return ResponseEntity.ok(unavailabilityList);
    }
    
    @GetMapping("/holiday-list/{doctorEmailId}")
    public ResponseEntity<Page<DoctorUnavailabilityListDTO>> getUnavailabilitiesByDoctorId(
            @PathVariable String doctorEmailId, 
            @PageableDefault(size = 10) Pageable pageable) {
        System.out.println("Fetching unavailability for doctor with email: " + doctorEmailId);
        Page<DoctorUnavailabilityListDTO> unavailabilityList = Page.empty();
        try {
            unavailabilityList = service.getUnavailabilityListByDoctorId(doctorEmailId, pageable);
            System.out.println("Unavailability Page Size :"+ unavailabilityList.getSize());
            return ResponseEntity.ok(unavailabilityList);
        } catch (Exception e) {
            System.out.println("Error retrieving data: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/edit-unavailability/{id}")
    public ResponseEntity<DoctorUnavailability> editUnavailability(@PathVariable Long id, @RequestBody DoctorUnavailabilityEditDTO doctorUnavailabilityDTO) {
        try {
            System.out.println("Edit Doctor Unavailability " + id);
            DoctorUnavailability doctorUnavailability = service.editUnavailability(doctorUnavailabilityDTO, id);
            return ResponseEntity.ok(doctorUnavailability);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete-unavailability/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
	 System.out.println("Delete Unavailability By  ID : "+ id);
        try {
            service.deleteUnavailability(id);
            return ResponseEntity.ok().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting appointment: " + e.getMessage());
        }
    }

    
    @GetMapping("/all-holiday-list")
    public ResponseEntity<Page<DoctorUnavailabilityListDTO>> getAllUnavailabilities(@PageableDefault(size = 10) Pageable pageable) {
    	
        Page<DoctorUnavailabilityListDTO> unavailabilityList = service.getAllUnavailabilities( pageable);
        System.out.println("getUnavailabilityListByDoctorId"+ unavailabilityList.getSize() );
        return ResponseEntity.ok(unavailabilityList);
    }
    
    
// 
// // An endpoint to get availability slots by doctorId and date range
//    @GetMapping("/fetchAvailabilitySlots")
//    public ResponseEntity<?> getAvailability(@RequestParam String doctorEmailId, 
//                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
//                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
//        try {
//        	System.out.println("getAvailability API call");
//        	Doctor doctor = doctorService.getDoctorByEmailId(doctorEmailId);
//            List<DoctorAvailabilityResponseDTO> slots = service.findAvailabilityByDoctorAndDateRange(doctor.getDoctorId(), startDate, endDate);
//            System.out.println("Slots size"+slots.size());
//            return new ResponseEntity<>(slots, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//    
//    @PutMapping("/{availabilityId}")
//    public ResponseEntity<?> updateAvailability(@PathVariable Integer availabilityId, @RequestBody DoctorAvailability availability) {
//        DoctorAvailability updatedAvailability = service.updateAvailability(availabilityId, availability);
//        return ResponseEntity.ok(updatedAvailability);
//    }
//
//    @DeleteMapping("/{availabilityId}")
//    public ResponseEntity<?> deleteAvailability(@PathVariable Integer availabilityId) {
//        service.deleteAvailability(availabilityId);
//        return ResponseEntity.ok().build();
//    }
//    
//    @GetMapping("/getAvailability/{id}")
//    public ResponseEntity<DoctorAvailability> getAvailabilityById(@PathVariable Integer availabilityId) {
//        return service.getAvailabilityById(availabilityId)
//                .map(availability -> ResponseEntity.ok().body(availability))
//                .orElse(ResponseEntity.notFound().build());
//    }
}