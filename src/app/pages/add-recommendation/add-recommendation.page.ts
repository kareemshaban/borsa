import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category, CatgeoryService } from 'src/app/services/catgeory.service';
import { NotificationService  , Notification} from 'src/app/services/notification.service';
import { Recommendation, RecommendationService } from 'src/app/services/recommendation.service';

@Component({
  selector: 'app-add-recommendation',
  templateUrl: './add-recommendation.page.html',
  styleUrls: ['./add-recommendation.page.scss'],
})
export class AddRecommendationPage implements OnInit {
  categories: Category[];  
  fillteredCats: Category[];
  loaded: boolean = true;
  recommendation: Recommendation ={
    title: '' , 
    details: '' , 
    cat: null , 
    date: new Date() ,
    img: '' ,
    watch: 0 , 
    state: ''
  }
  cat: number ;
  title: string ;
  details: string ;
  state: string ;
  value: any ;
  search: string = '';
  constructor(private categoryService: CatgeoryService , private newsService: RecommendationService , 
    private toastControl: ToastController , private router: Router , private notificationService: NotificationService) {
    this.categoryService.GetCategories().subscribe(res =>{
      this.categories = res ;
      this.fillteredCats = res ;
    });
   }

  ngOnInit() {
  }
  AddNew(){
    this.loaded = false ;
    this.recommendation ={
      title: this.title , 
      details:this.details ,
      cat: this.fillteredCats[this.cat] ,
      date: new Date() ,
      img: '' , 
      watch: 0 , 
      state: this.state
    }
    this.newsService.CreatDocument(this.recommendation).then(res =>{
      this.CreatNotification();
    }).catch(err =>{
     this.loaded = true ;
     this.presentToast('something went wrong' , 'danger' , 3000);
    });
  }
  CreatNotification(){
    const notification :Notification = {
       title: this.fillteredCats[this.cat].code + " " + this.fillteredCats[this.cat].name, 
       details: this.title ,
       date: new Date() ,   
       users: []
    }
    this.notificationService.CreatDocument(notification).then(res =>{
      this.loaded = true ;
      this.presentToast('Done!' , 'success' , 3000);
      this.router.navigateByUrl('recommendation');
    }).catch(err =>{
      this.loaded = true ;
      this.presentToast('something went wrong' , 'danger' , 3000);
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
 onChange($event: Event): void {
  this.value = ($event as CustomEvent).detail.value;
  this.fillteredCats = [] ;
  for(let i = 0 ; i < this.categories.length ; i++){
    if((this.categories[i].name + this.categories[i].code ).toLowerCase().includes(String(this.value).toLowerCase())){
      this.fillteredCats.push(this.categories[i]);
    }
  }
}
}
