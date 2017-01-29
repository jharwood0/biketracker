import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { Device } from './device';

@Injectable()
export class DevicesService {
  devices : Observable<Device[]>;
  constructor(private http: Http, private authService : AuthService) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token});
    let options = new RequestOptions({headers:headers});
    this.devices = Observable.interval(1000)
      .switchMap(() => this.http.get("/api/devices/", options))
      .map(res => res.json())
      .share(); /* stops re execution of get request for multiple subscribers */
  }

  addDevice(newDevice: Device) {
    let bodyString = JSON.stringify(newDevice);
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token, 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});
    console.log(bodyString);
    return this.http.post("/api/devices/", bodyString, options)
                    .map((res:Response) => res.json());
  }

  removeDevice(deviceId: string) {
    console.log("Not implemented");
  }

  activateDevice(deviceId: string) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = new RequestOptions({headers:headers});
    return this.http.post("/api/devices/"+deviceId+"/activate", options)
                    .map((res:Response) => res.json());
  }

  deactivateDevice(deviceId: string) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = new RequestOptions({headers:headers});
    return this.http.post("/api/devices/"+deviceId+"/deactivate", options)
                    .map((res:Response) => res.json());
  }

}
