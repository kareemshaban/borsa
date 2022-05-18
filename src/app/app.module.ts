import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import{AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/File/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdmobFreeService } from './services/admob-free.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule , 
    AngularFireModule.initializeApp(environment.firebase) , AngularFirestoreModule , AngularFireAuthModule , AngularFireStorageModule] ,
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy } , 
    MediaCapture,
    BackgroundMode ,
    File,
    Media,
    StreamingMedia,
    PhotoViewer,
    InAppBrowser , 
    AppAvailability ,
    AdMobFree,
    AdmobFreeService ,
    ImagePicker,
    WebView ,
    Camera ,
    FilePath ,
    LocalNotifications , 
    EmailComposer,
    SocialSharing],
  bootstrap: [AppComponent],
})
export class AppModule {}
