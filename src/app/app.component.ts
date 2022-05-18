import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { EventsService } from './events.service';
import { AuthService } from './services/auth.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { NotificationService , Notification} from './services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
   email: string ;
   alert: any ;
   isAdmin: boolean ;
   notificationObs: Observable<Notification[]> ;
   notifications: Notification[];
   notificationCounter: number = 0 ;
   public appPages = [
    { title: 'الرئيسية', url: 'home', icon: 'home' , admin: '0'},
    { title: 'تحليلات', url: 'analysis', icon: 'stats-chart' ,admin: '0'},
    { title: 'اخبار الاسهم', url: 'news', icon: 'earth' ,admin: '0'},
    { title: 'توصيات الاسهم', url: 'recommendation', icon: 'bar-chart' ,admin: '0'},
    { title: 'قوائم الاسهم', url: 'categories', icon: 'archive' , admin: '0'},
    { title: 'طلبات التحليل ', url: 'orders', icon: 'newspaper' , admin: '0'},
    // { title: 'الاعدادات', url: 'settings', icon: 'settings' ,admin: '0'},
    { title: 'تواصل معنا', url: 'contact', icon: 'call' ,admin: '0'},

  ];
  constructor(private router: Router , private alertController: AlertController , public events: EventsService ,
    private angularAuth: AngularFireAuth , private menuController: MenuController ,   private platform: Platform,
    private authService: AuthService , private background: BackgroundMode , private notificationService: NotificationService) {
  
     
      this.setData();
   
      this.events.receiveLogin().subscribe((res:any)=>{
        console.log(res);
        this.setData();
      })
    
  }
  getNotification(){
    this.notificationObs =  this.notificationService.newss ;
    this.notificationObs.subscribe(res =>{
      this.notifications = res ;
      this.notificationCounter = this.notifications.filter(c=> c.users.length == 0 || c.users.filter(d=> d != this.email).length > 0).length ;
    });

  }
  
  setData(){
    console.log(localStorage.getItem('email'));
    this.email = localStorage.getItem('email') ;
    if(this.email && this.email != 'null'){
      if(this.email == 'admin@borsa.com'){  
        this.authService.SetIsAdmin(true);
        this.authService.SetIsGuest(false);
       this.appPages = [
         { title: 'الرئيسية', url: 'home', icon: 'home' , admin: '0'},
         { title: 'تحليلات', url: 'analysis', icon: 'stats-chart' ,admin: '0'},
         { title: 'اخبار الاسهم', url: 'news', icon: 'earth' ,admin: '0'},
         { title: 'توصيات الاسهم', url: 'recommendation', icon: 'bar-chart' ,admin: '0'},
         { title: 'قوائم الاسهم', url: 'categories', icon: 'archive' , admin: '0'},
         { title: 'طلبات التحليل ', url: 'orders', icon: 'newspaper' , admin: '0'},
     
       ];
   }
        else {
          this.getNotification();
         this.authService.SetIsAdmin(false);
         if(this.email == 'geust@borsadialy.com')
            this.authService.SetIsGuest(true);
            else 
            this.authService.SetIsGuest(false);
         this.appPages = [
           { title: 'الرئيسية', url: 'home', icon: 'home' , admin: '0'},
           { title: ' طلب تحليل سهم ', url: 'order', icon: 'newspaper' , admin: '0'},
           { title: '   الاسهم المفضلة ', url: 'favourit', icon: 'star' , admin: '0'},
          //  { title: 'التنبيهات', url: 'notifications', icon: 'notifications' ,admin: '0'},
           { title: 'تواصل معنا', url: 'contact', icon: 'call' ,admin: '0'},
           
       
         ];
        }
      this.router.navigateByUrl('');
       }  else {
        this.router.navigateByUrl('register');
       }
 
  
         
         
 
  }
  async SignOutUser(){
    this.alert = await this.alertController.create({
     header: 'يسعدنا وجودك معنا',
     message: 'هل تريد تسجيل الخروج ؟',
     cssClass:'buttonCss',
     buttons: [
       {
         text: 'لا',
         role: 'cancel',
         handler: (blah) => {
          this.menuController.toggle();
           console.log('Confirm Cancel: blah');
         }
       } , {
         text: 'نعم',

         handler: () => {
           this.menuController.toggle();
          localStorage.setItem('email' , null);
          this.angularAuth.signOut().then(res =>{
            console.log(res);
            this.menuController.close();
            this.router.navigateByUrl('login');
     //       navigator['app'].exitApp();
          }).catch(err =>{
            alert(JSON.stringify(err) );
          //  navigator['app'].exitApp();
           this.menuController.close();
          });
         }
       }
   ]
   });
   await this.alert.present();
 }
  OpenPage(url: string){
  this.menuController.toggle();
  this.router.navigateByUrl(url);
 }
 
}
