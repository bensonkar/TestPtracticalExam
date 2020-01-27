package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User findOneByUsername(String username);
	
	User findByUsername(String username);
	
	User findByEmail(String email);
	
	User findByPassword(String password);
}
