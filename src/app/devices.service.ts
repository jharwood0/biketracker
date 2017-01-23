import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';


@Injectable()
export class DevicesService {

  constructor(private http:Http, private authService: AuthService){
  }

  getDevices(){
    var userDevices = [];
    for(let deviceId of this.authService.decodeToken().devices){
      this.http.get('/api/devices/'+deviceId) //todo add jwt token
          .map(res => res.json())
          .subscribe(device => {
            userDevices.push(device);
          });
    }
    return userDevices;
  }

  //todo add jwt token
  deleteUplink(deviceId : string){
      this.http.delete('/api/devices/'+deviceId+'/uplink')
      return true;
  }

  //todo add jwt token
  getDevice(deviceId : string){
    return Observable.interval(2000)
                     .switchMap(() => this.http.get("/api/devices/"+deviceId+"/"))
                     .map(res => res.json());
  }

}
