import { Component } from '@angular/core';
import {DevicesService} from './devices.service';

import { DevicesComponent } from './devices/devices.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DevicesService]
})
export class AppComponent {
}
