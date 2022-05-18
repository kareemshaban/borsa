import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Category, CatgeoryService } from 'src/app/services/catgeory.service';
import { Favourit, FavouritService } from 'src/app/services/favourit.service';
import { UserObj, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
    isAdmin: boolean ;
    categories: Category[] ;
    filltered: Category[];
    alert: any ;
    value: any ;
   favourit: Favourit = {
      user: null ,
      cat: null
    }
    favourits: Favourit [] ;
    users: UserObj [];
    user: UserObj ;
  constructor(private authService: AuthService , private router: Router , private categoriesService: CatgeoryService , 
    private userService: UserService ,
    private toastControl: ToastController , private alertController: AlertController , private favouritService: FavouritService) {
    this.isAdmin = this.authService.GetIsAdmin();
    this.categoriesService.GetCategories().subscribe(res =>{
      this.categories = res ;
      this.filltered = res ;
      console.log(this.categories);
    });
    this.favouritService.GetFavourits().subscribe(res =>{
      this.favourits = res ;
    })
    
   }
   AddToFavourit(i: number){
    this.userService.getUsers().subscribe(res =>{
      this.users = res ;
      for(let i = 0 ; i < this.users.length ; i++){
        if(this.users[i].email == localStorage.getItem('email')){
          this.user = this.users[i];
        
          break;
        }
      }
      console.log(this.filltered[i]);
      if(this.favourits.filter(c=> c.user.id == this.user.id && c.cat.id == this. filltered[i].id).length == 0){
        this.favourit = {
          cat: this.filltered[i] , 
          user: this.user 
        }
        this.favouritService.AddFavourit(this.favourit).then(res =>{
 
          this.presentToast('تم اضافة السهم الي المفضلة' , 'success' , 3000);
        });
      } else {
       
        this.presentToast('هذا السهم في قائمة المفضلة لديك بالفعل' , 'danger' , 3000);
      }
     
    });
   }
  ngOnInit() {
  }
  AddNew(){
  this.router.navigateByUrl('add-category');
  }
  async Delete(id: string){
    this.alert = await this.alertController.create({
      header: 'حذف السهم',
      message: 'هل تريد حذف السهم ؟',
      cssClass:'buttonCss',
      buttons: [
        {
          text: 'لا',
          role: 'cancel',
          handler: (blah) => {
         
            console.log('Confirm Cancel: blah');
          }
        } , {
          text: 'نعم',
 
          handler: () => {
            
          this.categoriesService.deleteCategory(id).then(res =>{
            this.presentToast('Done' , 'success' , 3000);
             this.categoriesService.GetCategories().subscribe(res =>{
              this.categories = res ;
            });
          }).catch(err =>{
            this.presentToast('Something went wrong' , 'danger' , 3000);
          });
        
          }
        }
    ]
    });
    await this.alert.present();
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
  Edit(i: number){
    this.categoriesService.setCat(this.filltered[i]);
    this.router.navigateByUrl('edit-category');
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
