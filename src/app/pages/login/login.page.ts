import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { EventsService } from 'src/app/events.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string ;
  password: string ;
  loaded: boolean =  true ;
  userData: any ;
  subscription: any ;
  constructor(private router: Router , private authService: AuthService , private toastControl: ToastController , 
    private ngFireAuth: AngularFireAuth , public events: EventsService , private platform: Platform) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
  }
  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }
  GoToLgin(){
    this.router.navigateByUrl('register');
  }
  async presentToast( Mmessage: string , mColor: string , mduration: number) {
    const toast = await this.toastControl.create({
      message: Mmessage,
      position: 'bottom',
      color: mColor  ,
      duration: mduration
    });
    toast.present();
  }
  Guest(){
    localStorage.setItem('email' , "geust@borsadialy.com");
    this.events.publishLogin("geust@borsadialy.com");
          this.router.navigateByUrl('');
  }
  LoginUser(){
    this.loaded = false ;
    this.authService.SignIn(this.email , this.password).then(res =>{
      this.ngFireAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('email' , this.email);
          localStorage.setItem('user', JSON.stringify(this.userData));
          console.log(JSON.parse(localStorage.getItem('user')));
          this.loaded = true ;
          this.presentToast('Login Sucess' , 'success' , 3000);
          this.events.publishLogin(this.email);
          this.router.navigateByUrl('');
        } else {
          localStorage.setItem('user', null); 
          console.log(JSON.parse(localStorage.getItem('user')));
        }
      });
    
    
    
    }).catch(err =>{
     this.loaded = true ;
     this.presentToast('this data is invaled ' , 'danger' , 3000);
    });
  }
}
