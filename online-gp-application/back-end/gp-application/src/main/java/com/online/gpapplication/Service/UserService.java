package com.online.gpapplication.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.online.gpapplication.Model.User;
import com.online.gpapplication.Repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
    @Autowired
    private PasswordEncoder passwordEncoder;

	
	public User saveUser(User user) {
       user.setPassword(passwordEncoder.encode(user.getPassword()));
       System.out.println(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

}
