import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
public user = new User();
public passExists = true;
public userError: User;
public isCreated = false;

  constructor(private api: ApiService,
              private route: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  processForm() {
this.api.changePassword(this.user).subscribe(
  data => {
    this.passExists = true;
    this.isCreated = true;
    this.route.navigate(['login']);
  },
  error => {
    this.userError = error.error;
    this.isCreated = false;
    if (error.status === 409) {
      this.isCreated = true;
      this.passExists = false;

    }

  }
);
  }

}
