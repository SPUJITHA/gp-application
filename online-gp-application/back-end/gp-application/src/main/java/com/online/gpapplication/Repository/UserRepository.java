package com.online.gpapplication.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.online.gpapplication.Model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmailId(String emailId);
	

}
