import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Device } from '../device';

@Component({
  selector: 'app-device-creator',
  templateUrl: './device-creator.component.html',
  styleUrls: ['./device-creator.component.css']
})
export class DeviceCreatorComponent implements OnInit {
  device : Device = new Device();
  loading : boolean = false;
  constructor(private devicesService : DevicesService) { }

  ngOnInit() {
  }

  createDevice(){
    this.loading = true;
    console.log(this.device);
    this.devicesService.addDevice(this.device)
                       .subscribe(result => {
                         this.loading = false;
                       });
  }

}
