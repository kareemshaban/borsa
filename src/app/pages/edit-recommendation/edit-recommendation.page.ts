import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category, CatgeoryService } from 'src/app/services/catgeory.service';
import { NewsService } from 'src/app/services/news.service';
import { Recommendation, RecommendationService } from 'src/app/services/recommendation.service';

@Component({
  selector: 'app-edit-recommendation',
  templateUrl: './edit-recommendation.page.html',
  styleUrls: ['./edit-recommendation.page.scss'],
})
export class EditRecommendationPage implements OnInit {
  categories: Category[];
  loaded: boolean = true;
  
  cat: number ;
  title: string ;
  details: string ;
  state: string ;
  recommendation: Recommendation ={
    title: '' , 
    details: '' ,
    date: new Date ,
    img: '' ,
    watch: 0 ,
    cat: null , 
    state: ''
  };
  constructor(private categoryService: CatgeoryService , private recommendationService: RecommendationService , 
    private toastControl: ToastController , private router: Router) { 
      this.categoryService.GetCategories().subscribe(res =>{
        this.categories = res ;
        this.recommendation = this.recommendationService.getRecommendation();
        this.title = this.recommendation.title ;
        this.details = this.recommendation.details ;
        this.state = this.recommendation.state ;
        for(let i = 0 ; i < this.categories.length ; i++){
          if(this.recommendation.cat.id == this.categories[i].id){
            this.cat = i ;
            break;
          }
          this.loaded = true ;
        }
      } , err =>{
        this.loaded = true ;
      });

    }
    AddNew(){
      this.loaded = false ;
      this.recommendation.details = this.details ;
      this.recommendation.title = this.title ;
      this.recommendation.cat = this.categories[this.cat];
      this.recommendation.state = this.state ;
      this.recommendationService.updateDocument(this.recommendation).then(res =>{
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
  ngOnInit() {
  }

}
