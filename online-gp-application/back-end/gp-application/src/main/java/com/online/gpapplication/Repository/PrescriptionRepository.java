package com.online.gpapplication.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.online.gpapplication.Model.AppointmentListDTO;
import com.online.gpapplication.Model.Doctor;
import com.online.gpapplication.Model.Prescription;
import com.online.gpapplication.Model.PrescriptionDoctorDTO;
import com.online.gpapplication.Model.PrescriptionServicesListDTO;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
	
	@Query("SELECT new com.online.gpapplication.Model.PrescriptionDoctorDTO(" +
		       "p.prescriptionId, p.dateIssued, p.status, p.paymentStatus, p.transactionId, " +
		       "p.trackingNumber, m.medicineName, i.frequency, i.duration, i.refill, i.refillMonths, " +
		       "i.frequency * i.duration * m.unitPrice as totalCost) " +
		       "FROM Prescription p JOIN p.items i " +
		       "JOIN i.medicine m " +
		       "WHERE p.appointment.appointmentId = :appointmentId")
		List<PrescriptionDoctorDTO> findPrescriptionItemsByAppointmentId(@Param("appointmentId") Long appointmentId);

	@Query("SELECT new com.online.gpapplication.Model.PrescriptionServicesListDTO(" +
	           "p.prescriptionId as prescriptionId, " +
	           "d.doctorName as doctorName, " +
	           "p.appointment.appointmentId as appointmentId, "+
	           "p.dateIssued as dateIssued, " +
	           "p.status as status, " +
	           "p.paymentStatus as paymentStatus, " +
	           "p.transactionId as transactionId,"
	           + "p.trackingNumber as trackingNumber) " +
	           "FROM Prescription p JOIN p.doctor d " +
	           "WHERE p.patient.userId = :patientId order by p.prescriptionId desc")
	Page<PrescriptionServicesListDTO> getPrescriptionsByPatientId(@Param("patientId") Long patientId, Pageable pageable);

	
}
