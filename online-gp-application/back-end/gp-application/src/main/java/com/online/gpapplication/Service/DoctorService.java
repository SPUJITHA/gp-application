package com.online.gpapplication.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.online.gpapplication.Model.*;
import com.online.gpapplication.Repository.*;

@Service
public class DoctorService {
	
	@Autowired
    private DoctorRepository doctorRepository;
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private SymptomRepository symptomsRepository;

//    public List<DoctorFilterDTO> fetchDoctorsList() {
//        return doctorRepository.fetchDoctorList();
//    }
//
    public List<String> fetchSpecialityList() {
        return doctorRepository.fetchSpecialityList();
    }

    public List<DoctorFilterDTO> fetchDoctorsBySpeciality(String speciality) {
    	
    	List<DoctorFilterDTO> doctorsListBySpeciality = doctorRepository.fetchDoctorsBySpeciality(speciality);
    	System.out.println("Doctors List By Speciality Size"+ doctorsListBySpeciality);
        return doctorsListBySpeciality;
    }
    
	public Doctor getDoctorById(Integer doctorId)
    {
    	return doctorRepository.getDoctorById(doctorId);
    }
   
	public Doctor getDoctorByEmailId(String emailId)
	{
		return doctorRepository.getDoctorByEmailId(emailId);
	
	}
	
	
	public Page<DoctorAppointmentList> findAppointmentsByDoctorId(Long doctorId, Pageable pageable) {
		System.out.println("Doctor ID : " + doctorId);
	    // Call  repository to find appointments by doctor ID
	    Page<DoctorAppointmentList> appointmentList  = appointmentRepository.findAppointmentsByDoctorId(doctorId, pageable);
	    System.out.println("Doctor Appointment List Size : " + appointmentList.getSize());
	    return appointmentList;
	}
	
	public Page<AdminAppointmentList> findAppointments(Pageable pageable) {
		Page<AdminAppointmentList> appointmentList  = appointmentRepository.findAllAppointments(pageable);
	    System.out.println("Admin Appointment List Size : " + appointmentList.getSize());
	    return appointmentList;
	}
	
	public List<Symptoms> getAllSpecialities()
	{
		List<Symptoms> specialityList =symptomsRepository.getAllSpecialities();
		return specialityList;
	}
	
	public List<String> getAllDoctorSpecialities()
	{
		List<String> specialityList =symptomsRepository.getAllDoctorSpecialities();
		return specialityList;
	}
	
	
	 public Doctor saveDoctor(Doctor doctor) {
	        return doctorRepository.save(doctor);
	    }
}
