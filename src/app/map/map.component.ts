import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  deviceId : string;
  datas : any [];

  constructor(private dataService : DataService) { }

  ngOnInit() {
  }

  getData(event){
    event.preventDefault();
    console.log("Fetching data");
    this.dataService.getAllData(this.deviceId)
                    .subscribe(datas => {
                      console.log("Updating data");
                      this.datas = datas;
                    });

  }

}
