import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { Device } from './device';

@Injectable()
export class DevicesService {
  devices = Observable.interval(5000)
    .switchMap(() => this.http.get("/api/devices/"))
    .map(res => res.json());
  constructor(private http: Http) {

  }

  addDevice(newDevice: Device) {
    let bodyString = JSON.stringify(newDevice);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});
    console.log(bodyString);
    return this.http.post("/api/devices/", bodyString, options)
                    .map((res:Response) => res.json());
  }

  removeDevice(deviceId: string) {

  }

  activateDevice(deviceId: string) {

  }

  deactivateDevice(deviceId: string) {

  }

}
