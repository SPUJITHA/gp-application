package com.online.gpapplication.Service;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.online.gpapplication.Model.DoctorAvailabilityResponseDTO;
import com.online.gpapplication.Model.DoctorAvailability;
import com.online.gpapplication.Model.DoctorAvailabilityDTO;
import com.online.gpapplication.Repository.DoctorAvailabilityRepository;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.online.gpapplication.Model.*;
@Service
public class DoctorAvailabilityService {

    @Autowired
    private DoctorAvailabilityRepository repository;

    public void saveAvailabilities(List<DoctorAvailability> availabilities) {
    	
        repository.saveAll(availabilities);
    }
    

    
    
//    public List<DoctorAvailability> findAvailabilityByDoctorAndDateRange(Integer doctorId, LocalDate startDate, LocalDate endDate) {
//        return repository.findAllByDoctorIdAndAvailableDayBetween(doctorId, startDate, endDate);
//    }
//    
    public List<DoctorAvailabilityResponseDTO> findAvailabilityByDoctorAndDateRange(Integer doctorId, LocalDate startDate, LocalDate endDate)
    {
    	return repository.fetchSlotsByDoctorIdAndAvailableDay(doctorId, startDate, endDate);
    }
    
    @Transactional
    public DoctorAvailability updateAvailability(Integer availabilityId, DoctorAvailability availability) {
        // Fetch the existing availability
        DoctorAvailability existingAvailability = repository.findById(availabilityId)
            .orElseThrow(() -> new IllegalArgumentException("Availability not found with id: " + availabilityId));
        // Update the existing availability
        existingAvailability.setAvailableDay(availability.getAvailableDay());
        existingAvailability.setAvailableStartTime(availability.getAvailableStartTime());
        existingAvailability.setAvailableEndTime(availability.getAvailableEndTime());
        // Save the updated availability
        return repository.save(existingAvailability);
    }

    @Transactional
    public void deleteAvailability(Integer availabilityId) {
        // Check if the availability exists
        boolean exists = repository.existsById(availabilityId);
        if (!exists) {
            throw new IllegalArgumentException("Availability not found with id: " + availabilityId);
        }
        // Delete the availability
        repository.deleteById(availabilityId);
    }
    
    public Optional<DoctorAvailability> getAvailabilityById(Integer id) {
        return repository.findById(id);
    }
}
