package com.online.gpapplication.Repository;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.online.gpapplication.Model.DoctorAvailability;
import com.online.gpapplication.Model.DoctorAvailabilityResponseDTO;
import com.online.gpapplication.Model.DoctorFilterDTO;

@Repository
public interface DoctorAvailabilityRepository extends JpaRepository<DoctorAvailability, Integer> {
	
//	 List<DoctorAvailability> findAllByDoctorIdAndAvailableDayBetween(Integer doctorId, LocalDate start, LocalDate end);
	 
	@Query("SELECT new com.online.gpapplication.Model.DoctorAvailabilityResponseDTO(d.availabilityId, d.availableDay, d.availableStartTime, d.availableEndTime) " +
		       "FROM DoctorAvailability d WHERE d.doctorId = :doctorId AND d.availableDay >= :start AND d.availableDay <= :end")
		List<DoctorAvailabilityResponseDTO> fetchSlotsByDoctorIdAndAvailableDay(Integer doctorId, LocalDate start, LocalDate end);

	
}
