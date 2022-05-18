import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Category, CatgeoryService } from 'src/app/services/catgeory.service';
import { Order, OrderService } from 'src/app/services/order.service';
import { UserObj, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  isAdmin: boolean ;
  isGuest: boolean ;
  loaded: boolean = true ;
  categories: Category[] ;
  filltered: Category[] ;
  users: UserObj[];
  value: any ;
  alert: any ;
  cat: Category ;
  user: UserObj ;
  order: Order ={
    user: null , 
    cat: null ,
    msg: '' ,
    date: new Date()

  }
  constructor(private authService: AuthService , private router: Router , private categoriesService: CatgeoryService , 
    private toastControl: ToastController , private alertController: AlertController , private userService: UserService , 
    private orderService: OrderService) {
    this.isAdmin = this.authService.GetIsAdmin();
   this.isGuest = this.authService.GetIsGuest();
   if(this.isGuest){
     this.presentToast('برجاء تسجيل الدخول اولا','danger' , 3000);
     this.router.navigateByUrl('login');
   }
    this.userService.getUsers().subscribe(res =>{
      console.log(res);
      this.users =res ;
      for(let i = 0 ; i < this.users.length ; i++){
        if(this.users[i].email == localStorage.getItem('email')){
          this.user = this.users[i];
        
          break;
        }
      }
      console.log(this.user);
      this.categoriesService.GetCategories().subscribe(res =>{
        this.categories = res ;
        this.filltered = res ;
        console.log(this.categories);
      });
    } , err =>{
      console.log(err);
    });
  
    
   }
   Order(i: number){
     this.loaded = false ;
    this.cat = this.filltered[i];
    this.order = {
      cat: this.cat , 
      user: this.user ,
      msg: '' ,
      date: new Date()

    }
    this.orderService.CreatUserDocument(this.order).then(res =>{
      this.loaded = true ;
      this.presentToast('we have recived your order and we will responde very soon' , 'success' , 3000);
        this.router.navigateByUrl('');
    }).catch(err =>{
      this.presentToast('Something went wrong' , 'danger' , 3000);
      this.loaded = true ;

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
  ngOnInit() {
  }
  onChange($event: Event): void {
    this.value = ($event as CustomEvent).detail.value;
    this.filltered = [];
    for(let i = 0 ; i < this.categories.length ; i++){
      if((this.categories[i].name + this.categories[i].code ).toLowerCase().includes(String(this.value).toLowerCase())){
        this.filltered.push(this.categories[i]);
      }
    }
    console.log(this.value);
  }
}
