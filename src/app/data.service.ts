import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DataService {
  constructor(private http : Http) { 
    console.log("Initalized data service");
  }

  getAllData(deviceId : string){
    return Observable.interval(2000)
                     .switchMap(() => this.http.get("/api/devices/"+deviceId+"/datas/"))
                     .map(res => res.json());
  }

}
