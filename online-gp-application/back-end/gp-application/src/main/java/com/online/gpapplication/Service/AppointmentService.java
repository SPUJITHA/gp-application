package com.online.gpapplication.Service;



import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.online.gpapplication.Model.AdminAppointmentList;
import com.online.gpapplication.Model.Appointment;
import com.online.gpapplication.Model.Appointment.AppointmentStatus;
import com.online.gpapplication.Model.AppointmentDTO;
import com.online.gpapplication.Model.AppointmentDetails;
import com.online.gpapplication.Model.AppointmentListDTO;
import com.online.gpapplication.Model.Doctor;
import com.online.gpapplication.Model.PatientDetails;
import com.online.gpapplication.Model.RescheduleAppointmentDTO;
import com.online.gpapplication.Model.User;
import com.online.gpapplication.Repository.AppointmentRepository;
import com.online.gpapplication.Repository.DoctorRepository;
import com.online.gpapplication.Repository.PatientDetailsRepository;
import com.online.gpapplication.Repository.SymptomRepository;
import com.online.gpapplication.Repository.UserRepository;

@Service
public class AppointmentService {
	
	

	@Autowired
	AppointmentRepository appointmentRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	DoctorRepository doctorRepository;
	
	@Autowired
	SymptomRepository symptomRepository;
	
	@Autowired
	PatientDetailsRepository patientDetailsRepository;
	
	@Autowired
	EmailService emailService;
	
	public Appointment saveAppointment(AppointmentDTO appointmentDTO) {
		 User  user = userRepository.findByEmailId(appointmentDTO.getUserEmail());
		 Appointment appointment = new Appointment ();
		 appointment.setPatientId(user.getUserId());
		 appointment.setAppointmentDate( appointmentDTO.getDate());
		 appointment.setAppointmentTime(appointmentDTO.getTime());
		 PatientDetails patientDetails = patientDetailsRepository.fetchUserById(user.getUserId());
		 appointment.setPatientDetails(patientDetails);
		 if(appointmentDTO.getDoctorRequestId() != null)
		 {
		 Doctor doctor = doctorRepository.fetchDoctor(appointmentDTO.getDoctorRequestId());
		 appointment.setDoctor(doctor);
		 appointment.setStatus(Appointment.AppointmentStatus.Booked);
		 appointment.setSymptoms(appointmentDTO.getSymptoms());
		 
		 }
		 else
		 {
			 List<String> doctorsEmailList = symptomRepository.fetchDoctorsListBySymptomsAndAvailability(appointmentDTO.getSymptoms(), appointmentDTO.getDate());
			 List<String> doctorsGPList = doctorRepository.fetchGPDoctors();
		        Doctor doctor = null; // Declare doctor object here to avoid repeated code
		        if (doctorsEmailList != null && !doctorsEmailList.isEmpty()) {
			 
			  doctor = doctorRepository.getDoctorByEmailId(doctorsEmailList.get(0));
			 }
			 else if(doctorsGPList != null && !doctorsGPList.isEmpty()) {
			 
			 doctor = doctorRepository.getDoctorByEmailId(doctorsGPList.get(0));
			
			 }
		        if (doctor == null) {
		            throw new RuntimeException("No available doctors found for the symptoms or speciality on the requested date.");
		        }
			 
		        appointment.setDoctor(doctor);
			 appointment.setStatus(Appointment.AppointmentStatus.Booked);
			 appointment.setSymptoms(appointmentDTO.getSymptoms());
		 }
		 
		 
         Appointment savedAppointment = appointmentRepository.save(appointment);
         emailService.sendSimpleMessage(
			        user.getEmailId(),
			        "Appointment Confirmation",
			        "Your appointment with " + appointment.getDoctor().getDoctorName() + " is confirmed for " + appointment.getAppointmentDate()
			    +".Your Appointment ID :"+ savedAppointment.getAppointmentId());
		
         return savedAppointment;
    }

	 public Page<AppointmentListDTO> findAllAppointmentsByPatientId(Long patientId, Pageable pageable) {
	        return appointmentRepository.findAllAppointmentsByPatientId(patientId, pageable);
	    }
	 
	
	 public Appointment rescheduleAppointment(Long id, AppointmentDetails updatedAppointment) {
	       Appointment appointmentDetails = appointmentRepository.findByAppointmentId(id);
	       Optional<User>  user = userRepository.findById(appointmentDetails.getPatientId());
	       appointmentDetails.setAppointmentDate(updatedAppointment.getDate());
	       appointmentDetails.setAppointmentTime(updatedAppointment.getTime());
	       appointmentDetails.setStatus(AppointmentStatus.Rescheduled);
	       appointmentRepository.save(appointmentDetails);
	       emailService.sendSimpleMessage(
			        user.get().getEmailId(),
			        "Reschedule Appointment Confirmation",
			        "Your appointment with " + appointmentDetails.getDoctor().getDoctorName() + " is being rescheduled. New Appointment Date : " + appointmentDetails.getAppointmentDate()
			   +". New Appointment Time : " + appointmentDetails.getAppointmentTime() +".Your Appointment ID :"+ appointmentDetails.getAppointmentId());
	       return appointmentDetails;
	 }
	 
	
	 public RescheduleAppointmentDTO findByAppointmentId(Long id) {
		 	
		    RescheduleAppointmentDTO appointment =  appointmentRepository.fetchAppointments(id);
		    System.out.println("Appointment Details:"+ appointment.getAppointmentId() + "Patient Appointment Details" );
		    return appointment ;
		}
	 
	 public Appointment rescheduleAppointment (RescheduleAppointmentDTO appointmentDTO, Long id)
	 {	 
	 Appointment appointmentDetails = appointmentRepository.fetchAppointment(id);
	 System.out.println("appointment Details"+appointmentDetails.getPatientId());
     if (appointmentDetails != null) {
    	 Optional<User>  user = userRepository.findById(appointmentDetails.getPatientId());
    	 appointmentDetails.setAppointmentDate( appointmentDTO.getAppointmentDate());
    	 appointmentDetails.setAppointmentTime(appointmentDTO.getAppointmentTime());
    	 appointmentDetails.setStatus(AppointmentStatus.Rescheduled);
		 appointmentRepository.save(appointmentDetails);
		 emailService.sendSimpleMessage(
			        user.get().getEmailId(),
			        "Reschedule Appointment Confirmation",
			        "Your appointment with " + appointmentDetails.getDoctor().getDoctorName() + " is being rescheduled. New Appointment Date : " + appointmentDetails.getAppointmentDate()
			    +".Your Appointment ID :"+ appointmentDetails.getAppointmentId());
		
		 System.out.println("Appointment Details :"+appointmentDetails.getAppointmentDate() + appointmentDetails.getAppointmentTime());
     }
     return appointmentDetails;
     
	 }
	 
	  public void deleteAppointment(Long appointmentId) {
		  Appointment appointmentDetails = appointmentRepository.fetchAppointment(appointmentId);
		  System.out.println("appointment Details"+appointmentDetails.getPatientId());
//	        appointmentRepository.deleteById(appointmentId);
	        Optional<User>  user = userRepository.findById(appointmentDetails.getPatientId());
	         appointmentDetails.setStatus(AppointmentStatus.Cancelled);
			 appointmentRepository.save(appointmentDetails);
			 
	        emailService.sendSimpleMessage(
			        user.get().getEmailId(),
			        "Cancel Appointment Confirmation",
			        "Your Appointment ID :"+ appointmentDetails.getAppointmentId() +" with " + appointmentDetails.getDoctor().getDoctorName() + " is being cancelled.");
		
	        System.out.println("Delete by appointment Id :" +appointmentId);
	        
	    }
	  
	  public AppointmentListDTO fetchAppointmentByAppointmentId(Long appointmentId)
	  {
		  AppointmentListDTO appointmentDetails = appointmentRepository.fetchAppointmentByAppointmentId(appointmentId);
		  
		  return appointmentDetails;
	  }

	 
	  public Page<AdminAppointmentList> findAllAdminAppointments(Pageable pageable)
	  {
		  return appointmentRepository.findAllAdminAppointments(pageable);
	  }
	  
	  public List<String> findAvailableTimeSlots(String doctorEmailId, LocalDate date) {
		    Doctor doctor = doctorRepository.getDoctorByEmailId(doctorEmailId);
		    List<Appointment> appointments = appointmentRepository.findByDoctorAndAppointmentDate(doctor, date);
		    System.out.println("Appointments :" + appointments);
		    System.out.println("LocalDate :" + date + "DoctorEmailId:"+ doctorEmailId);

		    // Formatter for input times
		    DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("HH:mm"); // Assuming time is stored like "10:00", "14:30"
		    
		    // Formatter for output times in 24-hour format
		    DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("HH:mm"); // 24-hour format

		    // Collecting booked times and formatting them to 24-hour format
		    List<String> bookedTimes = appointments.stream()
		        .map(appointment -> {
		            // Ensure the time string is correctly formatted before parsing
		            String formattedTime = appointment.getAppointmentTime().toString();
		            // Parse and format the time to 24-hour format
		            return LocalTime.parse(formattedTime, inputFormatter).format(outputFormatter);
		        })
		        .collect(Collectors.toList());

		    System.out.println("Booked Times" + bookedTimes);

		    // List of all time slots in 24-hour format
		    List<String> allTimeSlots = Arrays.asList(
		        "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
		        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
		    );

		    // Filtering available time slots
		    List<String> availableTimeSlots = allTimeSlots.stream()
		        .filter(time -> !bookedTimes.contains(time))
		        .collect(Collectors.toList());

		    System.out.println("Available Time Slots" + availableTimeSlots);
		    return availableTimeSlots;
		}
}