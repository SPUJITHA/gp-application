package com.online.gpapplication.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.online.gpapplication.Model.AdminSupportList;
import com.online.gpapplication.Model.AppointmentListDTO;
import com.online.gpapplication.Model.SupportRequestList;
import com.online.gpapplication.Model.TechnicalRequest;

@Repository
public interface TechnicalRequestRepository extends JpaRepository<TechnicalRequest, Long> {

//	@Query("SELECT new com.online.gpapplication.Model.SupportRequestList(tr.id as id, tr.issueType as issueType, tr.issueDescription as issueDescription, tr.createdAt as createdAt, tr.status as status) FROM TechnicalRequest tr WHERE tr.patientId.emailId = :emailId")
//	Page<SupportRequestList> findByEmailId(@Param("emailId") String emailId , Pageable pageable);
//	

	@Query("SELECT new com.online.gpapplication.Model.SupportRequestList(" +
		       "tr.id as id, tr.issueType as issueType, tr.issueDescription as issueDescription, tr.status as status, tr.createdAt as createdAt) " +
		       "FROM TechnicalRequest tr WHERE tr.patientId.emailId = :emailId")
		Page<SupportRequestList> findByEmailId(@Param("emailId") String emailId, Pageable pageable);

	@Query("SELECT new com.online.gpapplication.Model.AdminSupportList(" +
		       "tr.id, u.emailId, pd.firstName, pd.lastName, tr.issueDescription, " +
		       "tr.issueType, tr.status, tr.createdAt) " +
		       "FROM TechnicalRequest tr " +
		       "JOIN tr.patientId u " +
		       "JOIN PatientDetails pd ON pd.user = u ")
		Page<AdminSupportList> findAllRequests( Pageable pageable);
}
