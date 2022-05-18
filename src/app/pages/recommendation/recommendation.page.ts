import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Recommendation, RecommendationService } from 'src/app/services/recommendation.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss'],
})
export class RecommendationPage implements OnInit {
recommendations: Recommendation [];
alert: any ;
isAdmin: boolean ;
  constructor(private router: Router , private recomendationService: RecommendationService , private socialSharing: SocialSharing,
    private toastControl: ToastController , private alertController: AlertController , private authService: AuthService)  {
      this.isAdmin = this.authService.GetIsAdmin();
    this.recomendationService.GetNews().subscribe(res =>{
      this.recommendations = res ;
    });
   }
   Share(index: number){
    this.socialSharing.share(this.recommendations[index].cat.code + "--" +this.recommendations[index].cat.name +" " + this.recommendations[index].title, '', 
    'https://play.google.com/store/apps/details?id=com.app.boras.dialy.app').then(res =>{
       console.log(res);
    }).catch(e => {
     console.log(e);
    });
  }
  ngOnInit() {
  }
  AddNew(){
    this.router.navigateByUrl('add-recommendation');
  }
  async Delete(id: string){
    this.alert = await this.alertController.create({
      header: 'حذف توصية',
      message: 'هل تريد حذف التوصية ؟',
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
            
          this.recomendationService.deleteDocument(id).then(res =>{
            this.presentToast('Done' , 'success' , 3000);
             this.recomendationService.GetNews().subscribe(res =>{
              this.recommendations = res ;
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
    this.recomendationService.setCat(this.recommendations[i]);
    this.router.navigateByUrl('edit-recommendation');
  }
}
