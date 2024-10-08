package com.online.gpapplication.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.online.gpapplication.Model.AdminAppointmentList;
import com.online.gpapplication.Model.Appointment;
import com.online.gpapplication.Model.AppointmentListDTO;
import com.online.gpapplication.Model.AppointmentTrendsDTO;
import com.online.gpapplication.Model.Doctor;
import com.online.gpapplication.Model.DoctorAppointmentList;
import com.online.gpapplication.Model.RescheduleAppointmentDTO;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

//	@Query("SELECT new com.election.votingsystem.Model.CandidateResultDTO(c.candidateName, p.party, SUM(c.voteCount)) " +
//	           "FROM Candidate c JOIN c.party p JOIN c.constituency cons " +
//	           "WHERE cons.constituencyName = :constituencyName " +
//	           "GROUP BY c.candidateName, p.party")
//	    List<CandidateResultDTO> findResultsByConstituencyName(String constituencyName);

	
//	 @Query("SELECT new com.online.gpapplication.Model.AppointmentListDTO(a.appointmentId, d.doctorName, a.appointmentDate, " +
//	           "a.appointmentTime, a.status, a.symptoms) " +
//	           "FROM Appointment a JOIN Doctor d ON a.doctorId = d.doctorId " +
//	           "WHERE a.patientId = :patientId")
//	    List<AppointmentListDTO> findAllAppointmentsByPatientId(Integer patientId);
//	

	@Query("SELECT new com.online.gpapplication.Model.AppointmentListDTO(" +
	           "a.appointmentId as appointmentId, " +
	           "d.doctorName as doctorName, " +
	           "d.speciality as speciality, " +
	           "d.emailId as doctorEmailId, " +
	           "a.appointmentDate as appointmentDate, " +
	           "a.appointmentTime as appointmentTime, " +
	           "a.status as status, " +
	           "a.symptoms as symptoms) " +
	           "FROM Appointment a JOIN a.doctor d " +
	           "WHERE a.patientId = :patientId order by a.appointmentDate desc")
	Page<AppointmentListDTO> findAllAppointmentsByPatientId(@Param("patientId") Long patientId, Pageable pageable);

	
	@Query ("SELECT a FROM Appointment a where a.appointmentId = :id")
    Appointment fetchAppointment(@Param("id") Long id);
	
	
	@Query("SELECT new com.online.gpapplication.Model.DoctorAppointmentList(" +
		       "a.appointmentId as appointmentId, " +
		       "pd.email as patientEmailId, " +
		       "pd.firstName as firstName, " +
		       "pd.lastName as lastName, " +
		       "a.appointmentDate as appointmentDate, " +
		       "a.appointmentTime as appointmentTime, " +
		       "a.status as status, " +
		       "a.symptoms as symptoms, " +
		       "(CASE WHEN p.prescriptionId IS NOT NULL THEN true ELSE false END) as prescriptionExists) " +
		       "FROM Appointment a " +
		       "JOIN a.patientDetails pd " +
		       "LEFT JOIN Prescription p ON p.appointment.appointmentId = a.appointmentId " +
		       "WHERE a.doctor.doctorId = :doctorId " +
		       "ORDER BY a.appointmentDate DESC")
		Page<DoctorAppointmentList> findAppointmentsByDoctorId(@Param("doctorId") Long doctorId, Pageable pageable);

	@Query("SELECT new com.online.gpapplication.Model.RescheduleAppointmentDTO(" +
		       "a.appointmentId as appointmentId, " +
		       "a.appointmentDate as appointmentDate, " +
		       "a.appointmentTime as appointmentTime, " +
		       "a.symptoms as symptoms) " +
		       "FROM Appointment a  where a.appointmentId = :appointmentId")
   RescheduleAppointmentDTO  fetchAppointments(Long appointmentId);
	
	Appointment findByAppointmentId (Long appointmentId);
    
	@Query("SELECT new com.online.gpapplication.Model.DoctorAppointmentList(" +
		       "a.appointmentId as appointmentId, " +
		       "pd.email as patientEmailId, " +
		       "d.doctorName as doctorName, " +
	           "d.speciality as speciality, " +
	           "d.emailId as doctorEmailId, " +
		       "pd.firstName as firstName, " +
		       "pd.lastName as lastName, " +
		       "a.appointmentDate as appointmentDate, " +
		       "a.appointmentTime as appointmentTime, " +
		       "a.status as status, " +
		       "a.symptoms as symptoms) " +
		       "FROM Appointment a JOIN a.doctor d JOIN a.patientDetails pd  " +
		       "WHERE a.doctor.doctorId = :doctorId ORDER BY a.appointmentDate DESC")
		Page<AdminAppointmentList> findAllAppointments(Pageable pageable);
	
	
	@Query("SELECT new com.online.gpapplication.Model.AppointmentListDTO(" +
	           "a.appointmentId as appointmentId, " +
	           "d.doctorName as doctorName, " +
	           "d.speciality as speciality, " +
	           "d.emailId as doctorEmailId, " +
	           "a.appointmentDate as appointmentDate, " +
	           "a.appointmentTime as appointmentTime, " +
	           "a.status as status, " +
	           "a.symptoms as symptoms) " +
	           "FROM Appointment a JOIN a.doctor d " +
	           "WHERE a.appointmentId = :appointmentId order by a.appointmentDate, a.appointmentId desc")
	AppointmentListDTO fetchAppointmentByAppointmentId(@Param("appointmentId") Long appointmentId);

	
	@Query("SELECT  new com.online.gpapplication.Model.AppointmentTrendsDTO( a.appointmentDate as appointmentDate, COUNT(a.appointmentId) as count) FROM Appointment a GROUP BY a.appointmentDate")
	List<AppointmentTrendsDTO> findAppointmentTrends();
	
    @Query("SELECT new com.online.gpapplication.Model.AdminAppointmentList(" +
            "a.appointmentId as appointmentId, " +
            "pd.firstName as firstName, " +
            "pd.lastName as lastName, " +
            "pd.email as patientEmailId, " +
            "d.doctorName as doctorName, " +
            "d.speciality as doctorSpeciality, " +
            "a.appointmentDate as date, " +
            "a.appointmentTime as time, " +
            "a.status as status) " +
            "FROM Appointment a JOIN a.patientDetails pd JOIN a.doctor d ORDER BY a.appointmentDate DESC")
     Page<AdminAppointmentList> findAllAdminAppointments(Pageable pageable);
    
    List<Appointment> findByDoctorAndAppointmentDate(Doctor doctor, LocalDate date);
	
}
