import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user : any = {"username": ""}; //todo turn this into model
  constructor(private authService: AuthService) {
    this.authService.getUser()
      .subscribe(user => {
        this.user = user;
      });
  }

  ngOnInit() {
  }

}
