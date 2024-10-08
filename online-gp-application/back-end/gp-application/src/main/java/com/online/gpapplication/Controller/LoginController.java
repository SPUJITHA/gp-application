package com.online.gpapplication.Controller;

import java.util.Map;


//import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.online.gpapplication.Model.OtpEntry;
import com.online.gpapplication.Model.User;
import com.online.gpapplication.Repository.UserRepository;
import com.online.gpapplication.Service.EmailService;
import com.online.gpapplication.Service.OtpService;
import com.online.gpapplication.Service.UserService;

import jakarta.servlet.http.HttpSession;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class LoginController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    OtpService otpService;
    
    @Autowired
    EmailService emailService;
    
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/signup/patient")
    public ResponseEntity<?> registerPatient(@RequestBody User user) {
    	System.out.println("Patient Registration Details"+ user);
    	if (userRepository.findByEmailId(user.getEmailId()) != null) {
            return new ResponseEntity<>("Email already in use!", HttpStatus.BAD_REQUEST);
        }
        
        // Set the role for the user
        user.setRole("PATIENT");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(passwordEncoder.encode(user.getPassword()));
       
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    
    
    @PostMapping("/login/patient")
    public ResponseEntity<?> patientLogin(@RequestBody Map<String, String> credentials) {
      String emailId = credentials.get("emailId");
      String password = credentials.get("password");  
        User user = userRepository.findByEmailId(emailId);
       if (user != null && passwordEncoder.matches(password, user.getPassword()) ||  user.getPassword().equals(password)) {
	//	if(user!=null && user.getPassword().equals(password))
		
			return new ResponseEntity<>("Valid User", HttpStatus.OK);
		}
		else if(user == null)
		{
			return new ResponseEntity<>("EmailID doesn't exists. Please signup!!!!", HttpStatus.BAD_REQUEST);
		}
		else
		{
			return new ResponseEntity<>("Invalid username or password.", HttpStatus.BAD_REQUEST);
		}
	}
    
    @PostMapping("/login/doctor")
    public ResponseEntity<?> doctorLogin(@RequestBody Map<String, String> loginRequest) {
    	String emailId = loginRequest.get("emailId");
        String password = loginRequest.get("password");  
        User user = userRepository.findByEmailId(emailId);
    if (user != null && passwordEncoder.matches(password, user.getPassword()) || user.getPassword().equals(password)) {
//          if(user!=null && user.getPassword().equals(password))
  		
  			return new ResponseEntity<>("Valid User", HttpStatus.OK);
  		}
  		else if(user == null)
  		{
  			return new ResponseEntity<>("EmailID doesn't exists. Please signup!!!!", HttpStatus.BAD_REQUEST);
  		}
  		else
  		{
  			return new ResponseEntity<>("Invalid username or password.", HttpStatus.BAD_REQUEST);
  		}
    }

    @PostMapping("/login/admin")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> loginRequest) {
    	String emailId = loginRequest.get("emailId");
        String password = loginRequest.get("password");  
        User user = userRepository.findByEmailId(emailId);
  if (user != null && (passwordEncoder.matches(password, user.getPassword()) ||  user.getPassword().equals(password))) {
   //       if(user!=null && user.getPassword().equals(password))
  		
  			return new ResponseEntity<>("Valid User", HttpStatus.OK);
  		}
  		else if(user == null)
  		{
  			return new ResponseEntity<>("EmailID doesn't exists. Please signup!!!!", HttpStatus.BAD_REQUEST);
  		}
  		else
  		{
  			return new ResponseEntity<>("Invalid username or password.", HttpStatus.BAD_REQUEST);
  		}
    }
    
    @PostMapping("/otp-login/patient")
    public ResponseEntity<?> patientOtpLogin(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("emailId");
        String password = credentials.get("password");
        User user = userRepository.findByEmailId(email);
       if (user != null &&  (passwordEncoder.matches(password, user.getPassword()) ||  user.getPassword().equals(password))) {
       // if (user != null && user.getPassword().equals(password)) {
            String otp = otpService.generateOtpForEmail(email);
            System.out.println("patientLogin OTP"+otp);
            emailService.sendSimpleMessage(email, "Your OTP", otp);
            return ResponseEntity.ok(Map.of("otpRequired", true, "message", "OTP sent. Please verify to continue."));
        } else {
            return new ResponseEntity<>("Invalid credentials.", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/validate-otp")
    public ResponseEntity<?> validateOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        Boolean isOtpValid = otpService.validateOtp(email, otp);
        System.out.println("Valid OTP:" +isOtpValid);
        if (isOtpValid) {
            otpService.deleteOtpEntry(email, otp);  // Clean up after validation
            User user = userRepository.findByEmailId(email);
            if (user != null) {
            	System.out.println("Valid user");
            	return new ResponseEntity<>("Valid User", HttpStatus.OK);
               
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired OTP");
        }
    }

//
//    private boolean isOtpValid(Long otpTime) {
//        long currentTime = System.currentTimeMillis();
//        return otpTime != null && (currentTime - otpTime) < 300000; // Valid for 5 minutes
//    }
//   
    
}