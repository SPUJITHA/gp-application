package com.online.gpapplication.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.online.gpapplication.Model.Doctor;
import com.online.gpapplication.Model.PatientDetails;
import com.online.gpapplication.Model.PatientListDTO;
import com.online.gpapplication.Model.User;

@Repository
public interface PatientDetailsRepository extends JpaRepository<PatientDetails, Integer> {
	
	
	
	@Query ("SELECT p FROM PatientDetails p where  p.user.userId  = :id")
    PatientDetails fetchUserById( Long id);

	 @Query("SELECT new com.online.gpapplication.Model.PatientListDTO(" +
	           "p.patientId as patientId, " +
	           "p.firstName as firstName, " +
	           "p.lastName as lastName, " +
	           "p.email as email, " +
	           "p.gender as gender, " +
	           "p.dateOfBirth as dateOfBirth, " +
	           "p.phoneNumber as phoneNumber, " +
	           "p.medicalHistory as medicalHistory, " +
	           "p.currentMedication as currentMedication, " +
	           "p.allergies as allergies) " +
	           "FROM PatientDetails p ")
	Page<PatientListDTO> fetchAllPatients( Pageable pageable);


}
