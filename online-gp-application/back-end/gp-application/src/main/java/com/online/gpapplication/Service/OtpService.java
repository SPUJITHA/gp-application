package com.online.gpapplication.Service;

import java.time.LocalDateTime;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.online.gpapplication.Model.OtpEntry;
import com.online.gpapplication.Repository.OtpRepository;


@Service
public class OtpService {
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private OtpRepository otpRepository;


    public String generateOTP() {
        return RandomStringUtils.randomNumeric(6);
    }

    public void sendOtpMessage(String to, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }
    
        
        public String generateOtpForEmail(String email) {
            String otp = generateOTP(); // Implement this method to generate an actual OTP
            OtpEntry entry = new OtpEntry();
            entry.setEmail(email);
            entry.setOtp(otp);
            entry.setExpirationTime(LocalDateTime.now().plusMinutes(5)); // OTP expires in 5 minutes
            otpRepository.save(entry);
            return otp;
        }

        public boolean validateOtp(String email, String otp) {
            OtpEntry entry = otpRepository.findByEmailAndOtp(email, otp);
            System.out.println("Entry :"+ entry.getOtp());
            System.out.println("OTP :"+ otp);
            System.out.println("Email :"+ email);
            if (entry != null && entry.getOtp().equals(otp) && LocalDateTime.now().isBefore(entry.getExpirationTime())) {
//                otpRepository.delete(entry); 
                return true;
            }
            return false;
        }
        
        public void deleteOtpEntry(String email, String otp) {
        	 OtpEntry entry = otpRepository.findByEmailAndOtp(email, otp);
        	 System.out.println("DELETE OTP ENTRY"+ entry.getId());
             otpRepository.delete(entry);
        }
        
        public void deleteAll() {
       	  otpRepository.deleteAll();
            
       }
    }


