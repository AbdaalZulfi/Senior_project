import { Component } from '@angular/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  pairedDevices:[paired];
  constructor(private bluetoothSerial:BluetoothSerial ,
    private permissions:AndroidPermissions, private alertCtrl:AlertController) {

    }

  pair()
  {
    this.bluetoothSerial.isEnabled().then((succ)=>
    {
     this.permissions.checkPermission(this.permissions.PERMISSION.BLUETOOTH_CONNECT)
        .then((res)=>{
         this.bluetoothSerial.list().then(success=>
        {
         this.pairedDevices=success;
        }),
        error=>{ this.showError("No Paired Devices Found");}
       },
       (err)=>{this.permissions.requestPermission(this.permissions.PERMISSION.BLUETOOTH_CONNECT);})
 
    },(err)=>{
      this.showError("Please Enable Bluetooth and try again");
    });
  }

  
 async showError(error) {
  let  alert = await this.alertCtrl.create({
  message: error ,
  subHeader: 'Error',
  buttons: ['OK']
});
await alert.present(); 
}

}
interface paired {
  "class": number,
  "id": string,
  "address": string,
  "name": string,
  "isSelected":boolean
}