import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  datas: any[];
  devices: any[];
  focusLat: number = 52.561928;
  focusLng: number = -1.464854;
  zoom: number = 6;
  user : any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private devicesService: DevicesService) {
  }

  ngOnInit() {

  }

  getData(deviceId) {
    event.preventDefault();
    /*
    if (deviceId != "0") {
      console.log("Fetching data");
      this.dataService.getAllData(deviceId)
        .subscribe(datas => {
          console.log("Updating data");
          this.datas = datas;
          var i = datas.length - 1;
          if (i < 0) {
            console.log("Nowhere to focus..");
          } else {
            this.focusLat = datas[datas.length - 1].latitude;
            this.focusLng = datas[datas.length - 1].longitude;
            this.zoom = 20;
          }

        });
    }
    */
  }

}
