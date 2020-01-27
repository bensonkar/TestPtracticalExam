import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'util';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
public user = new User();
public userError: User;
public isCreated = false;
public userexists = false;

  constructor(private api: ApiService,
              private route: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  processForm() {
      this.api.register(this.user).subscribe(
        data => {
          this.isCreated = true;
          this.userexists = false;
          this.route.navigate(['login']);
        },
        // tslint:disable-next-line: no-shadowed-variable
        error => {
          this.userError = error.error;
          this.isCreated = false;
          if (error.status === 409) {
            this.isCreated = false;
            this.userexists = true;

          }

        }
      );
  }

}
