import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';

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

  constructor(private devicesService: DevicesService) { }

  ngOnInit() {
    this.devices = this.devicesService.getDevices();
  }

  getData(deviceId) { //todo make sure this is acutal id
    event.preventDefault();
    if (deviceId != "0") {
      console.log("Fetching data");
      this.devicesService.getDevice(deviceId)
      //this.dataService.getAllData(deviceId)
        .subscribe(datas => {
          console.log("Updating data");
          this.datas = datas.uplink;
          console.log(this.datas);
          var i = datas.length - 1;
          if (i < 0) {
            console.log("Nowhere to focus..");
          } else {
            this.focusLat = this.datas[this.datas.length - 1].latitude;
            this.focusLng = this.datas[this.datas.length - 1].longitude;
            this.zoom = 20;
          }

        });
    }
  }

}
