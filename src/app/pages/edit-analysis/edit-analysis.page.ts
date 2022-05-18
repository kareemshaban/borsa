import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Analysis, AnalysisService } from 'src/app/services/analysis.service';
import { Category, CatgeoryService } from 'src/app/services/catgeory.service';

@Component({
  selector: 'app-edit-analysis',
  templateUrl: './edit-analysis.page.html',
  styleUrls: ['./edit-analysis.page.scss'],
})
export class EditAnalysisPage implements OnInit {
  categories: Category[];
  loaded: boolean = true;
  news: Analysis ={
    title: '' , 
    details: '' , 
    cat: null , 
    date: new Date() ,
    img: '' ,
    watch: 0
  }
  cat: number ;
  title: string ;
  details: string ;
  img: string ;
  constructor(private categoryService: CatgeoryService , private newsService: AnalysisService , 
    private toastControl: ToastController , private router: Router) {
     
    this.categoryService.GetCategories().subscribe(res =>{
      this.categories = res ;
      this.news = this.newsService.getNew();
      this.title = this.news.title ;
      this.details = this.news.details ;
      this.img = this.news.img ;
      for(let i = 0 ; i < this.categories.length ; i++){
        if(this.news.cat.id == this.categories[i].id){
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
    this.news.details = this.details ;
    this.news.title = this.title ;
    this.news.cat = this.categories[this.cat];
    this.news.img = this.img ;
    this.newsService.updateDocument(this.news).then(res =>{
     this.loaded = true ;
     this.presentToast('Done!' , 'success' , 3000);
     this.router.navigateByUrl('analysis');
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
