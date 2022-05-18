import { Component, OnInit } from '@angular/core';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private inAppBrowser: InAppBrowser , private platform: Platform , 
    private appAvailability: AppAvailability) { }

  ngOnInit() {
  }
  openWhats() {
    let app;

    if (this.platform.is('ios')) {
      app = 'twitter://';
    } else if (this.platform.is('android')) {
      app = 'com.whatsapp';
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create('https://api.whatsapp.com/send?phone=+201025215248&amp;text=I%20want%20to%20find%20out%20about%20your%20products' + name, '_system');
      return;
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          console.log(app + ' is available')
          // Success
          // App exists
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://api.whatsapp.com/send?phone=+201025215248&amp;text=I%20want%20to%20find%20out%20about%20your%20products' + name, '_system');
        },
        (no: boolean) => {
          // Error
          // App does not exist
          // Open Web URL
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://api.whatsapp.com/send?phone=+201025215248&amp;text=I%20want%20to%20find%20out%20about%20your%20products' , '_system');
        }
      );
  }
  openTele() {
    let app;

    if (this.platform.is('ios')) {
      app = 'telegram://';
    } else if (this.platform.is('android')) {
      app = 'org.telegram.messenger';
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create('https://t.me/@BorsaDaily' , '_system');
      return;
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          console.log(app + ' is available')
          // Success
          // App exists
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://t.me/@BorsaDaily' , '_system');
        },
        (no: boolean) => {
          // Error
          // App does not exist
          // Open Web URL
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://t.me/@BorsaDaily' , '_system');
        }
      );
  }
}
