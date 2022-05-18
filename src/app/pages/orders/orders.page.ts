import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Order, OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  news: Order[] ;
  alert: any ;
  constructor(private newsService:OrderService , private router: Router , private authService: AuthService , 
    private toastControl: ToastController , private alertController: AlertController) {
    
    this.newsService.GetCategories().subscribe(res =>{
      this.news = res ;
    })
   }

  ngOnInit() {
  }
  async Delete(id: string){
    this.alert = await this.alertController.create({
      header: 'حذف الطلب',
      message: 'هل تريد حذف الطلب ؟',
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
            
          this.newsService.deleteCategory(id).then(res =>{
            this.presentToast('Done' , 'success' , 3000);
             this.newsService.GetCategories().subscribe(res =>{
              this.news = res ;
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
}
