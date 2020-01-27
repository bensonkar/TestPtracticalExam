import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../task';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: Task[];
  users: User[];
  isLoggedIn = false;
  doneTasks = [
    {
    title: 'React',
    description: 'Learn React'
  },
  {
    title: 'Vue',
    description: 'Learn Vue'
  },
];

  constructor(public api: ApiService,
              private toastr: ToastrService,
              private route: Router,
              private http: HttpClient ) { }

  ngOnInit() {
    this.api.getAllTasks().subscribe(data => {
      this.tasks = data;
    });

  }

  refreshUsers() {
    this.api.getAllTasks().subscribe(
      Response => {
         this.tasks = Response;
      }
    );
  }

  onlogout() {
    this.api.logout();
    this.route.navigate(['login']);
  }

  onDropTask(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
       moveItemInArray(event.container.data,
          event.previousIndex, event.currentIndex);
    } else {
       transferArrayItem(event.previousContainer.data,
       event.container.data,
       event.previousIndex,
       event.currentIndex);
    }
 }
}
