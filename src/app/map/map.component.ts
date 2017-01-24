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
  activeDevices: any[];
  defaultFocusLat : number = 52.561928;
  defaultFocusLng : number = -1.464854;
  focusLat: number = this.defaultFocusLat;
  focusLng: number = this.defaultFocusLng;
  defaultZoom : number = 6;
  zoom: number = this.defaultZoom;
  mapStyle: any[] = [{ "featureType": "landscape", "stylers": [{ "hue": "#FFBB00" }, { "saturation": 43.400000000000006 }, { "lightness": 37.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.highway", "stylers": [{ "hue": "#FFC200" }, { "saturation": -61.8 }, { "lightness": 45.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.arterial", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 51.19999999999999 }, { "gamma": 1 }] }, { "featureType": "road.local", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 52 }, { "gamma": 1 }] }, { "featureType": "water", "stylers": [{ "hue": "#0078FF" }, { "saturation": -13.200000000000003 }, { "lightness": 2.4000000000000057 }, { "gamma": 1 }] }, { "featureType": "poi", "stylers": [{ "hue": "#00FF6A" }, { "saturation": -1.0989010989011234 }, { "lightness": 11.200000000000017 }, { "gamma": 1 }] }];
  sub: any;

  constructor(private devicesService: DevicesService) { }

  ngOnInit() {
    this.devices = this.devicesService.getDevices();
    this.activeDevices = [];
    for(let device of this.devices){
      //if(device.isActive){
        this.activeDevices.push(device);
      //}
    }
  }

  getData(deviceId) {
    event.preventDefault();
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
    this.focusLat = this.defaultFocusLat;
    this.focusLng = this.defaultFocusLng;
    this.zoom = this.defaultZoom;
    this.datas = [];

    if (deviceId != "0") {
      this.sub = this.devicesService.getDevice(deviceId)
        .subscribe(datas => {
          this.datas = datas.uplink;
          var i = this.datas.length - 1;
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
