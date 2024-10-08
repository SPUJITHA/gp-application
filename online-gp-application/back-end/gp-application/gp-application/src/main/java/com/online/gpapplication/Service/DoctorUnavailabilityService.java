package com.online.gpapplication.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.online.gpapplication.Repository.DoctorRepository;
import com.online.gpapplication.Repository.DoctorUnavailabilityRepository;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.online.gpapplication.Model.*;
@Service
public class DoctorUnavailabilityService {

    @Autowired
    private DoctorUnavailabilityRepository repository;
    
    @Autowired
    private DoctorRepository doctorRepository;

    public DoctorUnavailability saveUnavailability(DoctorUnavailabilityDTO unavailabilityDTO) {
    	DoctorUnavailability doctorUnavailability = new DoctorUnavailability();
    	Doctor doctor = doctorRepository.getDoctorByEmailId(unavailabilityDTO.getDoctorEmailId());
    	doctorUnavailability.setDoctorId(doctor.getDoctorId());
    	doctorUnavailability.setUnavailableStartDay(unavailabilityDTO.getUnavailableStartDay());
    	doctorUnavailability.setUnavailableEndDay(unavailabilityDTO.getUnavailableEndDay());
    	doctorUnavailability.setUnavailableReason(unavailabilityDTO.getUnavailableReason());
        return repository.save(doctorUnavailability);
    }
    
    public List<DoctorUnavailability> getUnavailabilityByDoctorId(String doctorEmailId) {
    	Doctor doctor = doctorRepository.getDoctorByEmailId(doctorEmailId);
        return repository.findAllByDoctorId(doctor.getDoctorId());
        
    }

    public Page<DoctorUnavailabilityListDTO> getUnavailabilityListByDoctorId(String doctorEmailId,  Pageable pageable) {
    	Doctor doctor = doctorRepository.getDoctorByEmailId(doctorEmailId);
    	Page<DoctorUnavailabilityListDTO> unavailabilityList = repository.findUnavailabilityListByDoctorId(doctor.getDoctorId(), pageable);
        return unavailabilityList;
        
    }

    public Page<DoctorUnavailabilityListDTO> getAllUnavailabilities(Pageable pageable) {
    	Page<DoctorUnavailabilityListDTO> unavailabilityList = repository.getAllUnavailabilities( pageable);
        return unavailabilityList;
        
    }

    public DoctorUnavailability editUnavailability(DoctorUnavailabilityEditDTO doctorUnavailabilityDTO, Long id) {
        DoctorUnavailability doctorUnavailability = repository.findDoctorUnavailabilityByUnavailabilityId(id);
        System.out.println("Doctor Unavailability EditAvailability: " + doctorUnavailabilityDTO.getUnavailableEndDate() + " Start: " + doctorUnavailabilityDTO.getUnavailableStartDate());
        doctorUnavailability.setUnavailableEndDay(doctorUnavailabilityDTO.getUnavailableEndDate());
        doctorUnavailability.setUnavailableStartDay(doctorUnavailabilityDTO.getUnavailableStartDate());
        doctorUnavailability.setUnavailableReason(doctorUnavailabilityDTO.getUnavailableReason());
        repository.save(doctorUnavailability);
        return doctorUnavailability;
    }
 
    public void deleteUnavailability(Long id) {
        repository.deleteById(id);
        System.out.println("Delete by Unavailability Id :" +id);
        
    }

    
//    public List<DoctorAvailability> findAvailabilityByDoctorAndDateRange(Integer doctorId, LocalDate startDate, LocalDate endDate) {
//        return repository.findAllByDoctorIdAndAvailableDayBetween(doctorId, startDate, endDate);
//    }
//    
//    public List<DoctorAvailabilityResponseDTO> findAvailabilityByDoctorAndDateRange(Integer doctorId, LocalDate startDate, LocalDate endDate)
//    {
//    	return repository.fetchSlotsByDoctorIdAndAvailableDay(doctorId, startDate, endDate);
//    }
//    
//    @Transactional
//    public DoctorAvailability updateAvailability(Integer availabilityId, DoctorAvailability availability) {
//        // Fetch the existing availability
//        DoctorAvailability existingAvailability = repository.findById(availabilityId)
//            .orElseThrow(() -> new IllegalArgumentException("Availability not found with id: " + availabilityId));
//        // Update the existing availability
//        existingAvailability.setAvailableDay(availability.getAvailableDay());
//        existingAvailability.setAvailableStartTime(availability.getAvailableStartTime());
//        existingAvailability.setAvailableEndTime(availability.getAvailableEndTime());
//        // Save the updated availability
//        return repository.save(existingAvailability);
//    }
//
//    @Transactional
//    public void deleteAvailability(Integer availabilityId) {
//        // Check if the availability exists
//        boolean exists = repository.existsById(availabilityId);
//        if (!exists) {
//            throw new IllegalArgumentException("Availability not found with id: " + availabilityId);
//        }
//        // Delete the availability
//        repository.deleteById(availabilityId);
//    }
//    
//    public Optional<DoctorAvailability> getAvailabilityById(Integer id) {
//        return repository.findById(id);
//    }
}
