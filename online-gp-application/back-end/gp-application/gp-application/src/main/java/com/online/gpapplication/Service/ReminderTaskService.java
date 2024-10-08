package com.online.gpapplication.Service;

import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.online.gpapplication.Model.Prescription;
import com.online.gpapplication.Model.PrescriptionItems;
import com.online.gpapplication.Model.User;
import com.online.gpapplication.Repository.PrescriptionRepository;

@Component
public class ReminderTaskService{

    @Autowired
    private PrescriptionService prescriptionService;
    
    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private EmailService emailService;

    // A cron job to run every day at 7 AM
    @Scheduled(cron = "0 0 7 * * ?")
    public void sendReminders() {
        List<PrescriptionItems> itemsDueForRefill = prescriptionService.getPrescriptionsDueForRefill();
        Long prescriptionId = itemsDueForRefill.get(0).getPrescription().getPrescriptionId();
        Optional<Prescription> prescription = prescriptionRepository.findById(prescriptionId);
        User userId = prescription.get().getPatient();
        itemsDueForRefill.forEach(item -> {
            emailService.sendSimpleMessage(userId.getEmailId(),"Medication Refill Reminder" , "It's  time to refill your prescription for : " + item.getMedicine().getMedicineName());
        });
    }
}
