import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Injectable({
  providedIn: 'root'
})


export class LocationService {

  public location : any;
  public back:      any;
  constructor(private _Geolocation: Geolocation, private _BackgroundMode : BackgroundMode ,private _LocalNotifications: LocalNotifications) { }

  public getCurrenLoaction(){
    return new Promise((resolve, reject)=>{
      this._Geolocation.getCurrentPosition().then((dataCoordinates)=>{
        resolve(dataCoordinates);
      }).catch((error)=>{
        reject(error)
      })
    }).catch((error)=>{
      return error;
    })
  }

  public background(): void{

    this._BackgroundMode.enable();
    this._BackgroundMode.setDefaults({
      title: "Demo BackGround Ali",
      text: "Reporting location",
      color: "5260ff",
    });

    this._BackgroundMode.disableWebViewOptimizations();
    this._BackgroundMode.disableBatteryOptimizations();
    this._BackgroundMode.wakeUp();
    this.back = this._BackgroundMode.on("activate").subscribe((data)=>{
      this._BackgroundMode.disableWebViewOptimizations();
      this._BackgroundMode.disableBatteryOptimizations();
    })
  }

  async generateLocalNotification(message, cont){
    
    this._LocalNotifications.schedule({
      title: 'Demo BackGround Notificacion Ali',
      text:   'Lat:'+message.coords.latitude+'-'+'Lng'+message.coords.longitude + '  -' + cont,
    }); 
  }


}
