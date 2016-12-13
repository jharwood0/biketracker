import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class DevicesService {

  constructor(private http:Http){
    console.log('Initialized Device Service');
  }

  getDevices(){
    return this.http.get('/api/devices')
               .map(res => res.json());
  }

}
