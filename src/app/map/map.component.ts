import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Device } from '../device';
import { Uplink } from '../uplink';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  devices : Device[];
  staticDevices : Device[]; // Dirty hack for the headers of map resetting

  selectedIdx : number = -1;
  selectedUplinks : Uplink[];

  defaultFocusLat : number = 52.561928;
  defaultFocusLng : number = -1.464854;
  focusLat: number = this.defaultFocusLat;
  focusLng: number = this.defaultFocusLng;
  defaultZoom : number = 6;
  zoom: number = this.defaultZoom;
  mapStyle: any[] = [{ "featureType": "landscape", "stylers": [{ "hue": "#FFBB00" }, { "saturation": 43.400000000000006 }, { "lightness": 37.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.highway", "stylers": [{ "hue": "#FFC200" }, { "saturation": -61.8 }, { "lightness": 45.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.arterial", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 51.19999999999999 }, { "gamma": 1 }] }, { "featureType": "road.local", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 52 }, { "gamma": 1 }] }, { "featureType": "water", "stylers": [{ "hue": "#0078FF" }, { "saturation": -13.200000000000003 }, { "lightness": 2.4000000000000057 }, { "gamma": 1 }] }, { "featureType": "poi", "stylers": [{ "hue": "#00FF6A" }, { "saturation": -1.0989010989011234 }, { "lightness": 11.200000000000017 }, { "gamma": 1 }] }];

  constructor(private devicesService: DevicesService) { }

  ngOnInit() {
    this.staticDevices = []
    this.devicesService.devices.subscribe(
        devices => {
          this.devices = devices;
          /* this is a dirty hack because the users selected devEUI gets removed when the observable gets updated */
          if(this.staticDevices.length == 0){
            this.staticDevices = devices;
          }
          if(this.selectedIdx != -1){
            this.selectedUplinks = this.devices[this.selectedIdx].uplink;
            let uplinkLength = this.selectedUplinks.length;
            if(uplinkLength > 0){
              this.focusLat = this.selectedUplinks[this.selectedUplinks.length - 1].latitude;
              this.focusLng = this.selectedUplinks[this.selectedUplinks.length - 1].longitude;
              this.zoom = 20;
            }
          }else{
            this.focusLat = this.defaultFocusLat;
            this.focusLng = this.defaultFocusLng;
            this.zoom = this.defaultZoom;
          }
        }
    );
  }
  setDevice(idx : number){
    event.preventDefault();
    this.selectedUplinks = [];
    this.selectedIdx = idx;
  }

}
