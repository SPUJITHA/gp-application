package com.online.gpapplication.Service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.online.gpapplication.Model.Appointment;
import com.online.gpapplication.Model.Feedback;
import com.online.gpapplication.Model.FeedbackDTO;
import com.online.gpapplication.Repository.AppointmentRepository;
import com.online.gpapplication.Repository.FeedbackRepository;

@Service
public class FeedbackService {
    
	@Autowired
    FeedbackRepository feedbackRepository;


	@Autowired
    AppointmentRepository appointmentRepository;;
	
       public Feedback saveFeedback(FeedbackDTO feedbackDTO) {
        // Add any business logic here if necessary
    	Feedback feedback = new Feedback();
    	Appointment appointment = appointmentRepository.fetchAppointment(feedbackDTO.getAppointmentId().longValue());
    	feedback.setAppointment(appointment);
    	feedback.setComments(feedbackDTO.getComments());
    	feedback.setRating(feedbackDTO.getRating());
    	feedback.setFeedbackDate(LocalDate.now());
        return feedbackRepository.save(feedback);
    }
}