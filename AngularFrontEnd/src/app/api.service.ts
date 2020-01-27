import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Task } from './task';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user: User;

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post('http://localhost:8080/register', user);
  }

  login(loginPayload) {
    const headers = {
      Authorization: 'Basic ' + btoa('client:secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };

    return this.http.post('http://localhost:8080/oauth/token', loginPayload, {
      headers
    });
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('token');
    return !(user === null);
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }



  logout() {
    sessionStorage.removeItem('token');
  }

  changePassword(user: User) {
    return this.http.put('http://localhost:8080/changePassword', user);
  }


  getUserAccount() {
    const token = JSON.parse(sessionStorage.getItem('token'));
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + token.access_token
    );

    return this.http.get('http://localhost:8080/details', { headers: header });
  }

  addTask(task: Task) {
    return this.http.post('http://localhost:8080/add', task);
  }

  getAllTasks() {
    return this.http.get<Task[]>('http://localhost:8080/tasks');
  }
}
