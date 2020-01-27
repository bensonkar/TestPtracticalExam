package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepository;

@RestController
public class TaskController {
	
	
	@Autowired
	private TaskRepository taskRepository;
	
	
	@PostMapping("/add")
	public Task createTask(@RequestBody Task task) {
		return taskRepository.save(task);
	}
	
	
	@RequestMapping("/tasks")
	public List<Task >getAllTask() {
		return taskRepository.findAll();
	}

}
