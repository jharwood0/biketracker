import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {AuthService} from '../auth.service';
import {User} from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
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
