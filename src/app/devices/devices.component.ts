import { Component, OnInit, Input } from '@angular/core';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  constructor(private devicesService : DevicesService) {  }

  ngOnInit() {
    /*this.devicesService.getDevices()
        .subscribe(devices => {
          this.devices = devices;
        });*/
  }

}
