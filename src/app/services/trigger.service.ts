import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Chain } from '../models';

declare const cordova: any;

@Injectable({
  providedIn: 'root'
})
export class TriggerService {


  constructor(
    private platform: Platform,
    private storage: Storage,
    private router: Router,
  ) { }

  public enable(): void {
    if (!this.platform.is('cordova')) {
      return;
    }


    cordova.plugins.backgroundMode.disableBatteryOptimizations();
    cordova.plugins.backgroundMode.overrideBackButton();
    cordova.plugins.backgroundMode.requestForegroundPermission();

    cordova.plugins.backgroundMode.isIgnoringBatteryOptimizations((isIgnoring: boolean) => {
      if (!isIgnoring) {
        alert('Battery Optimizations');
      }
    });


    cordova.plugins.backgroundMode.enable();

    cordova.plugins.backgroundMode.on('activate', () => {
      cordova.plugins.backgroundMode.disableWebViewOptimizations();
    });

    setInterval(async () => {

      const now = new Date();

      this.storage.get('chains').then((chains: Chain[]) => {

        for (const chain of chains) {
          const time = chain.time ? new Date(chain.time) : null;
          if (time && time.getHours() === now.getHours() && time.getMinutes() === now.getMinutes()) {

            // if (!cordova.plugins.backgroundMode.isActive()) {
            // Turn screen on
            cordova.plugins.backgroundMode.wakeUp();
            // Turn screen on and show app even locked
            cordova.plugins.backgroundMode.unlock();
            cordova.plugins.backgroundMode.moveToForeground();
            // }

            this.router.navigate(['/alert', chain.id]);
          }
        }

      });

    }, 55000);
  }


}
