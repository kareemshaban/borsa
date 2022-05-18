import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdmobFreeService {
  interstitialConfig: AdMobFreeInterstitialConfig = {
    // add your config here
    // for the sake of this example we will just use the test config
    isTesting: true,
    autoShow: false,
  id: "ca-app-pub-2958215164030147/8108191475"
  };
  constructor(private admobFree: AdMobFree,
    public platform: Platform) { 
    

      }
      BannerAd() {
        let bannerConfig: AdMobFreeBannerConfig = {
          //  isTesting: true , // Remove in production
          autoShow: true,
          id: "ca-app-pub-2958215164030147/8108191475"
        };
        this.admobFree.banner.config(bannerConfig);
    
        this.admobFree.banner.prepare().then(() => {
          // success
        }).catch(e => alert(e));
      }
}
