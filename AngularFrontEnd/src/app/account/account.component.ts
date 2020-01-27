import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { log } from 'util';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  currentUser: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUserAccount().subscribe(data => {
      this.currentUser = data;
    });
  }
}
