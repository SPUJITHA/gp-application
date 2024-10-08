//package com.online.gpapplication.Service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.online.gpapplication.Model.LoginRequest;
//import com.online.gpapplication.Model.User;
//import com.online.gpapplication.Repository.DoctorRepository;
//import com.online.gpapplication.Repository.UserRepository;
//
//@Service
//public class LoginService {
//	
//	@Autowired
//    private UserRepository userRepository; // Assuming you have a UserRepository
//
//
//	@Autowired
//    private DoctorRepository doctorRepository; 
//	
//    public Optional<LoginResponse> authenticate(LoginRequest request) {
//        User user = doctorRepository.findByCredentials(request.getEmailId(), request.getPassword());
//        if (user != null) {
//            return Optional.of(new LoginResponse(user.getEmailId(), user.getRole().name()));
//        }
//        return Optional.empty();
//    }
//}
