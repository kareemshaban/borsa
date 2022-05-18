import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Favourit, FavouritService } from 'src/app/services/favourit.service';
import { UserObj, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourit',
  templateUrl: './favourit.page.html',
  styleUrls: ['./favourit.page.scss'],
})
export class FavouritPage implements OnInit {

  favourits: Favourit[];
  favourit: Favourit[];
  user: UserObj ;
  users: UserObj [];
  isGuest: boolean ;
  async presentToast( Mmessage: string , mColor: string , mduration: number) {
    const toast = await this.toastControl.create({
      message: Mmessage,
      position: 'bottom',
      color: mColor  ,
      duration: mduration
    });
    toast.present();
  }
  constructor(private favouritService: FavouritService , private router: Router ,  private toastControl: ToastController ,
    private userService: UserService , private authService: AuthService) { 
      this.isGuest = this.authService.GetIsGuest();
      if(this.isGuest){
        this.presentToast('برجاء تسجيل الدخول اولا','danger' , 3000);
        this.router.navigateByUrl('login');
      }
    this.userService.getUsers().subscribe(res =>{
    this.users = res ;
    for(let i = 0 ; i < this.users.length ; i++){
      if(this.users[i].email == localStorage.getItem('email')){
        this.user = this.users[i];
      
        break;
      }
    }
    this.favouritService.GetFavourits().subscribe(res => {
     this.favourit = res ;
     this.favourits = [];
     for(let i = 0 ; i < this.favourit.length ; i++){
       if(this.favourit[i].user.id == this.user.id){
         this.favourits.push(this.favourit[i]);
       }
     }

    });
  });
  }
  DisLik(id: string){
    this.favouritService.deleteFavourit(id).then(res =>{
      this.favouritService.GetFavourits().subscribe(res => {
        this.favourits = res ;
       });
    });
  }
  Open(id: string){
    this.router.navigate(['favourit-home' , {id: id}]);
  }
  AddNew(){
this.router.navigateByUrl('categories')
  }
  ngOnInit() {
  }

}
