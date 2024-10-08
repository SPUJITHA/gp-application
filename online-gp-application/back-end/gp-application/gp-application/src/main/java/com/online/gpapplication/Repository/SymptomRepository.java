package com.online.gpapplication.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.online.gpapplication.Model.DoctorFilterDTO;
import com.online.gpapplication.Model.Symptoms;
@Repository
public interface SymptomRepository extends JpaRepository<Symptoms, Integer> {
	
	
	@Query("SELECT d.emailId " +
		       "FROM Doctor d " +
		       "JOIN Symptoms s ON d.speciality = s.speciality " +
		       "LEFT JOIN DoctorUnavailability du ON d.doctorId = du.doctorId " +
		       "WHERE s.symptomName LIKE %:symptom% AND " +
		       "(:appointmentDate NOT BETWEEN du.unavailableStartDay AND du.unavailableEndDay OR du.unavailableStartDay IS NULL)")
		List<String> fetchDoctorsListBySymptomsAndAvailability(@Param("symptom") String symptom, @Param("appointmentDate") LocalDate appointmentDate);
    
	 
	 @Query ("SELECT distinct S \r\n"
		 		+ "FROM  Symptoms S ")
	   public List<Symptoms> getAllSpecialities();
	 
	 @Query ("SELECT distinct s.speciality \r\n"
		 		+ "FROM  Symptoms s ")
	   public List<String> getAllDoctorSpecialities();

}
