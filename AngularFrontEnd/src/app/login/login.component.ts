import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  invalidLogin = false;

  constructor(private route: Router,
              private formBuilder: FormBuilder,
              private apiService: ApiService,
              private toastr: ToastrService) { }

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    this.LoginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.LoginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.LoginForm.controls.username.value)
      .set('password', this.LoginForm.controls.password.value)
      .set('grant_type', 'password');

    this.apiService.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      this.invalidLogin = false;
      this.route.navigate(['home']);
    }, error => {
      this.invalidLogin = true;
    });
  }

}
