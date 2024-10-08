package com.online.gpapplication.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.online.gpapplication.Repository.PatientDetailsRepository;
import com.online.gpapplication.Repository.PrescriptionItemsRepository;
import com.online.gpapplication.Repository.PrescriptionRepository;
import com.online.gpapplication.Repository.DoctorRepository;
import com.online.gpapplication.Repository.MedicineRepository;
import com.online.gpapplication.Repository.UserRepository;

import jakarta.transaction.Transactional;

import com.online.gpapplication.Model.Appointment;
import com.online.gpapplication.Model.Appointment.AppointmentStatus;
import com.online.gpapplication.Model.AppointmentListDTO;
import com.online.gpapplication.Model.Doctor;
import com.online.gpapplication.Model.Prescription;
import com.online.gpapplication.Model.Prescription.PaymentStatus;
import com.online.gpapplication.Model.Prescription.PrescriptionStatus;
import com.online.gpapplication.Model.PrescriptionDTO;
import com.online.gpapplication.Model.PrescriptionDoctorDTO;
import com.online.gpapplication.Model.PrescriptionItemDTO;
import com.online.gpapplication.Model.PrescriptionItems;
import com.online.gpapplication.Model.PrescriptionServicesListDTO;
import com.online.gpapplication.Model.User;
import com.online.gpapplication.Model.Medicine;
import com.online.gpapplication.Repository.AppointmentRepository;
@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PrescriptionItemsRepository prescriptionItemsRepository;
    

    @Autowired
    private MedicineRepository medicineRepository;

    @Transactional
    public Prescription savePrescription(PrescriptionDTO prescriptionDTO) {
        // Convert DTO to Prescription entity
        Prescription prescription = convertToPrescriptionEntity(prescriptionDTO);
        prescriptionRepository.save(prescription);
        List<PrescriptionItems> prescriptionItems = convertToPrescriptionItemsEntities(prescriptionDTO.getItems(), prescription);
        prescription.setItems(prescriptionItems);
        prescriptionItemsRepository.saveAll(prescriptionItems);
     
        return prescriptionRepository.save(prescription);
    }
    
    
    private List<PrescriptionItems> convertToPrescriptionItemsEntities(
    	    List<PrescriptionItemDTO> items, Prescription prescription) {
    	  List<PrescriptionItems> prescriptionItemList = new ArrayList<>();
    	  for (PrescriptionItemDTO itemDTO : items) {
    	    PrescriptionItems item = new PrescriptionItems();
    	    item.setDuration(itemDTO.getDuration());
    	    item.setFrequency(itemDTO.getFrequency());
    	    item.setRefill(itemDTO.getRefill());
    	    item.setPrescription(prescription);
    	    item.setRefillMonths(itemDTO.getRefillMonths());
    	    // Set the medicine from the repository
    	    Medicine medicine = medicineRepository.findByMedicineName(itemDTO.getMedicineName())
    	        .orElseThrow(() -> new IllegalArgumentException("Medicine not found"));
    	    item.setMedicine(medicine); // Ensure this is set correctly

    	    prescriptionItemList.add(item);
    	  }
    	  return prescriptionItemList;
    	}

	public Prescription convertToPrescriptionEntity(PrescriptionDTO prescriptionDTO)
	{
		Prescription prescription = new Prescription();
		Appointment appointment = appointmentRepository.findByAppointmentId(prescriptionDTO.getAppointmentId());
		prescription.setAppointment(appointment);
		prescription.setDateIssued(new Date());
		Doctor doctor = doctorRepository.getDoctorByEmailId(prescriptionDTO.getDoctorEmailId());
		prescription.setDoctor(doctor);
		User patientId = userRepository.findByEmailId(prescriptionDTO.getPatientEmailId());
		prescription.setPatient(patientId);
		prescription.setPaymentStatus(Prescription.PaymentStatus.Pending);
		prescription.setStatus(Prescription.PrescriptionStatus.New);
		return prescription;
	}
	
	 public List<PrescriptionDoctorDTO> getPrescriptionsByAppointmentId(Long appointmentId) {
		 List<PrescriptionDoctorDTO> prescriptions = prescriptionRepository.findPrescriptionItemsByAppointmentId(appointmentId);
		    if (prescriptions == null) {
		        return new ArrayList<>(); // Return an empty list if the query returns null
		    }
		    return prescriptions;
		}
	 
	 public Prescription updatePrescription (Long prescriptionId)
	 {
	 String transactionId = UUID.randomUUID().toString(); // Generate a unique transaction ID
     String trackingNumber = "TRK-" + UUID.randomUUID().toString().substring(0, 8); // Generate a unique tracking number

     Optional<Prescription> prescriptionOpt = prescriptionRepository.findById(prescriptionId);
     Appointment appointmentDetails = prescriptionOpt.get().getAppointment();
     Prescription prescription = new Prescription();
     if (prescriptionOpt.isPresent()) {
          prescription = prescriptionOpt.get();
         prescription.setTransactionId(transactionId);
         prescription.setTrackingNumber(trackingNumber);
         prescription.setStatus(PrescriptionStatus.Paid);
         prescription.setPaymentStatus(PaymentStatus.Completed); // Update payment status
         appointmentDetails.setStatus(AppointmentStatus.Completed);
         prescriptionRepository.save(prescription); // Save the updated record
         appointmentRepository.save(appointmentDetails);
         System.out.println("Appointment Status Details"+appointmentDetails.getAppointmentId() +"Status :"+appointmentDetails.getStatus());
         
     }
     return prescription;
	 }
	 
	 public Page<PrescriptionServicesListDTO> getPrescriptionsByPatientId(Long patientId, Pageable pageable) {
	        return prescriptionRepository.getPrescriptionsByPatientId(patientId, pageable);
	    }
	 
	  
	    public List<PrescriptionItems> getPrescriptionsDueForRefill() {
	        Date today = new Date();
	        return prescriptionItemsRepository.findAll().stream()
	                .filter(item -> item.isRefill() && getNextRefillDate(item).before(today))
	                .collect(Collectors.toList());
	    }

	    private Date getNextRefillDate(PrescriptionItems item) {
	        Calendar calendar = Calendar.getInstance();
	        calendar.setTime(item.getPrescription().getDateIssued());
	        calendar.add(Calendar.MONTH, item.getRefillMonths());
	        return calendar.getTime();
	    }

}
