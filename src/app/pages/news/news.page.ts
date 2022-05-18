import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { News, NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  isAdmin: boolean ;
  news: News[] ;
  alert: any ;
  constructor(private newsService:NewsService , private router: Router , private authService: AuthService , 
    private toastControl: ToastController , private alertController: AlertController , 
    private socialSharing: SocialSharing) {
    this.isAdmin = this.authService.GetIsAdmin();
    this.newsService.GetNews().subscribe(res =>{
      this.news = res ;
    })
   }
   Share(index: number){
    this.socialSharing.share(this.news[index].cat.code + "--" +this.news[index].cat.name +" " + this.news[index].title, '', 
    'https://play.google.com/store/apps/details?id=com.app.boras.dialy.app').then(res =>{
       console.log(res);
    }).catch(e => {
     console.log(e);
    });
  }
   AddNew(){
   this.router.navigateByUrl('add-news');
   }

  ngOnInit() {
  }
  async Delete(id: string){
    this.alert = await this.alertController.create({
      header: 'حذف خبر',
      message: 'هل تريد حذف الخبر ؟',
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
            
          this.newsService.deleteDocument(id).then(res =>{
            this.presentToast('Done' , 'success' , 3000);
             this.newsService.GetNews().subscribe(res =>{
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
  Edit(i: number){
    this.newsService.setCat(this.news[i]);
    this.router.navigateByUrl('edit-news');
  }

}
