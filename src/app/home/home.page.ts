import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location/location.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public lat: any;
  public lng: any;
  public coordsData: any  = { coords: { latitude: "", longitude: "" }  }
  public cont: number =0;
  public disabled: boolean = false;
  constructor(private _LocationService: LocationService) { }

  ngOnInit() {

  }

  public callServices() {
    this.callLocation();
  }

  public callLocation() {
    this.locationGet();
    this.callInterval();
  }

  public locationGet(){ 
    this._LocationService.getCurrenLoaction().then((data)=>{
      this.coordsData=data
      this._LocationService.generateLocalNotification(this.coordsData, this.cont)
      this.disabled=true;
      
    }).catch((error)=>{
      console.log(error);
    })
  }

  
  public callInterval(){
    this._LocationService.background();
    setInterval(()=>{
      this.cont++;
      this.locationGet();
    },5000);
  }



}
