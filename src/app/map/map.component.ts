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
  focusLat : number = 52.561928;
  focusLng : number = -1.464854;
  zoom : number = 6;

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
                      var i = datas.length - 1;
                      if(i < 0){
                        console.log("Nowhere to focus..");
                      }else{
                        this.focusLat = datas[datas.length -1].latitude;
                        this.focusLng = datas[datas.length -1].longitude;
                        this.zoom = 20;
                      }

                    });

  }

}
