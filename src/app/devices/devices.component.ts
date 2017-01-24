import { Component, OnInit, Input } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Device } from '../device';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  devices : Device[];
  constructor(private devicesService : DevicesService) {  }

  ngOnInit() {
    this.devicesService.devices.subscribe(devices =>{
      if(devices != this.devices){
        this.devices = devices
      }
    });
  }

  setActive(event : any){
    let target = event.target || event.srcElement || event.currentTarget;
    let idAttr = target.attributes.id;
    let id = idAttr.nodeValue;
    console.log(id);
    console.log(this.devices[id]);
  }

}
