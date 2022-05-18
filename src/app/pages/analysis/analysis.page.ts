import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { Analysis, AnalysisService } from 'src/app/services/analysis.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {
  isAdmin: boolean ;
  news: Analysis[] ;
  alert: any ;

  constructor(private analysisService:AnalysisService , private router: Router , private authService: AuthService , 
    private toastControl: ToastController , private alertController: AlertController , 
    private socialSharing: SocialSharing) {
    this.isAdmin = this.authService.GetIsAdmin();
    this.analysisService.GetNews().subscribe(res =>{
      this.news = res ;
    })
   }  
   AddNew(){
    this.router.navigateByUrl('add-analysis');
    }
  ngOnInit() {
  }
  Share(index: number){
    this.socialSharing.share(this.news[index].cat.code + "--" +this.news[index].cat.name +" " + this.news[index].title, '', 
    'https://play.google.com/store/apps/details?id=com.app.boras.dialy.app').then(res =>{
       console.log(res);
    }).catch(e => {
     console.log(e);
    });
  }
  async Delete(id: string){
    this.alert = await this.alertController.create({
      header: 'حذف تحليل',
      message: 'هل تريد حذف التحليل ؟',
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
            
          this.analysisService.deleteDocument(id).then(res =>{
            this.presentToast('Done' , 'success' , 3000);
             this.analysisService.GetNews().subscribe(res =>{
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
    this.analysisService.setCat(this.news[i]);
    this.router.navigateByUrl('edit-analysis');
  }
}
