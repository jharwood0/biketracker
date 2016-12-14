import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DevicesComponent } from './devices/devices.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Define the routes
const ROUTES = [
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent,
    MapComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBjvGgmTVf5gE0aLcivSDUSGmtDPmybj90'
    }),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
