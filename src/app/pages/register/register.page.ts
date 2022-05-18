import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { User } from 'src/app/Model/User';
import{AuthService} from 'src/app/services/auth.service'
import { UserService , UserObj } from 'src/app/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  user: UserObj ={
    name: '' , 
    email: '' , 
    password: '', 
    uid: ''
   }
  email: string ;
  name: string;
  password: string ;
  loaded: boolean ;
  userData: any;
  subscription: any ;
  constructor(private router: Router , private authService: AuthService , private toastControl: ToastController , 
    private userService: UserService , private ngFireAuth: AngularFireAuth , private platform: Platform) { 
    this.loaded = true ;
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
  }
  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }
  GoToLgin(){
    this.router.navigateByUrl('login');
  }
  RegisterUser(){
   this.loaded = false ;
  this.authService.RegisterUser(this.email , this.password).then(res =>{
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        console.log(JSON.parse(localStorage.getItem('user')));
        this.CreateUserDocument();
      } else {
        localStorage.setItem('user', null); 
        console.log(JSON.parse(localStorage.getItem('user')));
      }
    })
   
   
  }).catch(err =>{
    this.loaded = true ;
    this.CreateUserDocument();
   this.presentToast('this register data is invaled or is used before' , 'danger' , 3000);
  });
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
  CreateUserDocument(){
   this.user = {
    name: this.name , 
    email: this.email , 
    password: this.password ,
    uid: JSON.parse(localStorage.getItem('user'))['uid']
   } 
   this.userService.CreatUserDocument(this.user).then(res =>{
 console.log(res);  
 this.loaded = true ;
 this.presentToast('Register Sucess' , 'success' , 3000);
 localStorage.setItem('email' , this.email);
 this.router.navigateByUrl('');
   }).catch(err =>{
console.log(err);
   });
  }

}
