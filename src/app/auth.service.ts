import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  public token: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('auth_token'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    var headers = new Headers();
    var creds = "username=" + username + "&password=" + password;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post('/auth/authenticate', creds, {headers : headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('auth_token', JSON.stringify({token: token}));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

// split getUser into user service instead of in auth...
  getUser(){
    // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token});
        let options = new RequestOptions({ headers: headers });

        let currentUser = this.jwtHelper.decodeToken(this.token);
        // get users from api
        console.log("decoded token: ");
        console.log(currentUser);
        return this.http.get('/api/users/'+currentUser._id, options)
            .map(res => res.json());
  }

  logout() {
    this.token = null;
    window.localStorage.clear();
  }

  decodeToken(){
    return this.jwtHelper.decodeToken(this.token);
  }

}
