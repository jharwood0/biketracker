import { Component } from '@angular/core';
import {DevicesService} from './devices.service';
import {DataService} from './data.service';

import { DevicesComponent } from './devices/devices.component';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DevicesService, DataService]
})
export class AppComponent {
}