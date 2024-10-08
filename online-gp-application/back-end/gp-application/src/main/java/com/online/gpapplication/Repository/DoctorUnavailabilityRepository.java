package com.online.gpapplication.Repository;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.online.gpapplication.Model.DoctorAppointmentList;
import com.online.gpapplication.Model.DoctorAvailability;
import com.online.gpapplication.Model.DoctorAvailabilityResponseDTO;
import com.online.gpapplication.Model.DoctorFilterDTO;
import com.online.gpapplication.Model.DoctorUnavailability;
import com.online.gpapplication.Model.DoctorUnavailabilityListDTO;

@Repository
public interface DoctorUnavailabilityRepository extends JpaRepository<DoctorUnavailability, Long> {
	
	List<DoctorUnavailability> findAllByDoctorId(Long doctorId);
	
	@Query("SELECT new com.online.gpapplication.Model.DoctorUnavailabilityListDTO(" +
		       "d.unavailabilityId as unavailabilityId, " +
		       "d.unavailableStartDay as unavailableStartDate, " +
		       "d.unavailableEndDay as unavailableEndDate, " +
		       "d.unavailableReason as unavailableReason)" +
		       "FROM DoctorUnavailability d  " +
		       "WHERE d.doctorId = :doctorId ORDER BY d.unavailabilityId DESC")
	Page<DoctorUnavailabilityListDTO> findUnavailabilityListByDoctorId(@Param("doctorId") Long doctorId, Pageable pageable);
	
	
	DoctorUnavailability findDoctorUnavailabilityByUnavailabilityId(Long unavailabilityId);
	
	@Query("SELECT new com.online.gpapplication.Model.DoctorUnavailabilityListDTO(" +
		       "d.unavailabilityId as unavailabilityId, " +
		       "d.unavailableStartDay as unavailableStartDate, " +
		       "d.unavailableEndDay as unavailableEndDate, " +
		       "d.unavailableReason as unavailableReason)" +
		       "FROM DoctorUnavailability d  " +
		       "ORDER BY d.unavailabilityId DESC")
	Page<DoctorUnavailabilityListDTO> getAllUnavailabilities(Pageable pageable);
	

}