import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

import { Device } from './device';

@Injectable()
export class DevicesService {
  devices = Observable.interval(1000)
                      .switchMap(() => this.http.get("/api/devices/"))
                      .map(res => res.json());
  constructor(private http:Http){
  }

  addDevice(newDevice : Device){

  }

  removeDevice(deviceId : string){

  }

  activateDevice(deviceId : string){

  }

  deactivateDevice(deviceId : string){

  }

}
