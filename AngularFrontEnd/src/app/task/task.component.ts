import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { ApiService } from '../api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

task = new Task();

  constructor(private api: ApiService,
              private route: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.api.addTask(this.task).subscribe(
      data => {
        this.route.navigate(['home']);
      }
    );
  }

}
