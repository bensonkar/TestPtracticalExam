package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	Map<String, String> errors;

	@PostMapping("/register")
	public ResponseEntity<Object> register(@RequestBody @Valid User user, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			errors = new HashMap<>();
			for (FieldError error : bindingResult.getFieldErrors()) {
				errors.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<>(errors, HttpStatus.NOT_ACCEPTABLE);
		}
		User u = userRepository.findByEmail(user.getEmail());
		if (u != null) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

		User k = userRepository.findByUsername(user.getUsername());
		if (k != null) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		//user.setRoles(Role.USER);
		return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
	}

	@PutMapping("/changePassword")
	public ResponseEntity<?> changePassword(@RequestBody @Valid User user, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			errors = new HashMap<>();
			for (FieldError error : bindingResult.getFieldErrors()) {
				errors.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<>(errors, HttpStatus.NOT_ACCEPTABLE);
		}

		User cp = userRepository.findByPassword(user.getPassword());
		if (cp != null) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
	}

	
	@RequestMapping("/details")
	public ResponseEntity<?> getDetails(){
		var auth = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return new ResponseEntity<>(auth, HttpStatus.OK);
	}

}
