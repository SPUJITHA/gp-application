package com.online.gpapplication.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.online.gpapplication.Model.*;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
	
//	@Query("SELECT new com.online.gpapplication.Model.DoctorFilterDTO(d.id, d.name, d.speciality, d.rating) FROM Doctor d")
//    List<DoctorFilterDTO> fetchDoctorList();
//
    @Query ("SELECT distinct (d.speciality) FROM Doctor d")
    List<String> fetchSpecialityList();
    
    @Query ("SELECT new com.online.gpapplication.Model.DoctorFilterDTO(d.doctorId as doctorId, d.doctorName as doctorName) FROM Doctor d where d.speciality = :speciality")
    List<DoctorFilterDTO> fetchDoctorsBySpeciality(String speciality);
    
    @Query ("SELECT d FROM Doctor d where d.id = :id")
    Doctor fetchDoctor(@Param("id") Long doctorId);
    

    @Query ("SELECT d FROM Doctor d where d.id = :id")
    Doctor getDoctorById( Integer id);
//    @Query ("SELECT new com.online.gpapplication.Model.DoctorFilterDTO( d.doctorName as doctorName, ) FROM Doctor d  where d.id = :id")
//    Doctor findByCredentials(Long id);


    @Query ("SELECT d FROM Doctor d where d.emailId = :emailId")
    Doctor getDoctorByEmailId( String emailId);
    
    @Query("SELECT d.emailId FROM Doctor d  " +
    	       "WHERE d.speciality = 'General Physician'")
    	List<String> fetchGPDoctors();

   
}