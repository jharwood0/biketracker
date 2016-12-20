import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usercreds : any = {};
  loading : boolean = false;

  constructor(private authService : AuthService, private router : Router) {  }

  ngOnInit() {
    if(localStorage.getItem('auth_token')){
      this.router.navigate(['/dashboard']);
    }
  }

  login(){
    this.loading = true;
    this.authService.login(this.usercreds.username, this.usercreds.password)
                    .subscribe(result => {
                      if(result === true){
                        this.router.navigate(['/dashboard']);
                      }else{
                        console.log("Incorrect password");
                      }
                      this.loading = false;
                    })
  }

}
