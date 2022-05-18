import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/events.service';
import { AdmobFreeService } from 'src/app/services/admob-free.service';
import { Analysis, AnalysisService } from 'src/app/services/analysis.service';
import { AuthService } from 'src/app/services/auth.service';
import { Category, CatgeoryService } from 'src/app/services/catgeory.service';
import { News, NewsService } from 'src/app/services/news.service';
import { Recommendation, RecommendationService } from 'src/app/services/recommendation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isAdmin: boolean ;
  cat: number ; 
  news: News[];
  fillteredNews: News[];
  analysis: Analysis[];
  fillteredAnalysis: Analysis[];
  categories: Category[];
  recommendations: Recommendation[];
  fillteredRecommindation: Recommendation[];
  filtter: string ;
  isGuest: boolean ;
  value: any ;
  search: string = '';
  constructor(private authServce: AuthService , private newsService: NewsService , private analysisService: AnalysisService , 
    private recommendationService: RecommendationService , private router: Router ,  public events: EventsService ,
    private categoryService: CatgeoryService , private admobService: AdmobFreeService) { 
      this.events.receiveLogin().subscribe((res:any)=>{
        this.isAdmin = this.authServce.GetIsAdmin();
        this.isGuest = this.authServce.GetIsGuest();

      });
    this.isAdmin = this.authServce.GetIsAdmin();
    this.isGuest = this.authServce.GetIsGuest();
  
    console.log(this.isGuest);
    this.categoryService.GetCategories().subscribe(res =>{
      this.categories = res ;
    
    this.newsService.GetNews().subscribe(res =>{
       this.news = res ;
       this.fillteredNews = res ;

    this.analysisService.GetNews().subscribe(res =>{
       this.analysis = res ;
       this.fillteredAnalysis = res ;
     
    this.recommendationService.GetNews().subscribe(res =>{
       this.recommendations = res ;
       this.fillteredRecommindation = res ;
   
    
    }, err =>{

    })
    } , err =>{

    });
    } , err =>{

    });
  } , err =>{

  });
    this.cat = 0 ;
    this.filtter = "0" ;
  }
  ionViewDidEnter(){
    this.search = '';
  }
  changeCat(){
    this.newsService.GetNews().subscribe(res =>{
      this.news = res ;
      if(this.filtter != "0")
      this.news = this.news.filter(c=> c.cat.id == this.filtter);
   
     this.fillteredNews = this.news ;
 

   this.analysisService.GetNews().subscribe(res =>{
      this.analysis = res ;
      if(this.filtter != "0")
      this.analysis = this.analysis.filter(c=> c.cat.id == this.filtter);
      this.fillteredAnalysis = this.analysis ;
   
   this.recommendationService.GetNews().subscribe(res =>{
      this.recommendations = res ;
      if(this.filtter != "0")
      this.recommendations = this.recommendations.filter(c=> c.cat.id == this.filtter);
      this.fillteredRecommindation = this.recommendations ;
   }, err =>{

   })
   } , err =>{

   });
   } , err =>{

   });
  }

  ngOnInit() {
    if(!this.isAdmin){
      this.admobService.BannerAd();
    }
  }
  OpenDetails(i: number , inddex: number){
    if(i == 0){ 
   this.newsService.setCat(this.fillteredNews[inddex]);
   
   
    } else if(i == 1){
  this.analysisService.setCat(this.fillteredAnalysis[inddex]);
    } else if(i == 2){
      this.recommendationService.setCat(this.fillteredRecommindation[inddex]);
    }
    this.search = '';
    this.router.navigate(['details' , {cat: i}]);
  }
  onChange($event: Event): void {
    this.value = ($event as CustomEvent).detail.value;
  

      this.fillteredNews = [];
      this.fillteredAnalysis = [];
      this.fillteredRecommindation = [];
      for(let i = 0 ; i < this.news.length ; i++){
        if((this.news[i].cat.name + this.news[i].cat.code ).toLowerCase().includes(String(this.value).toLowerCase())){
          this.fillteredNews.push(this.news[i]);
        }
      }

    for(let i = 0 ; i < this.analysis.length ; i++){
      if((this.analysis[i].cat.name + this.analysis[i].cat.code ).toLowerCase().includes(String(this.value).toLowerCase())){
        this.fillteredAnalysis.push(this.analysis[i]);
      }
    }
    for(let i = 0 ; i < this.recommendations.length ; i++){
      if((this.recommendations[i].cat.name + this.recommendations[i].cat.code ).toLowerCase().includes(String(this.value).toLowerCase())){
        this.fillteredRecommindation.push(this.recommendations[i]);
      }
    }
    console.log(this.value);
  }
}
