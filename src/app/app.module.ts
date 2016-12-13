import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DevicesComponent } from './devices/devices.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBjvGgmTVf5gE0aLcivSDUSGmtDPmybj90'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
