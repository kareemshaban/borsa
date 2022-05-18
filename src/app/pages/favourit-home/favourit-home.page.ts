import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Analysis, AnalysisService } from 'src/app/services/analysis.service';
import { News, NewsService } from 'src/app/services/news.service';
import { Recommendation, RecommendationService } from 'src/app/services/recommendation.service';

@Component({
  selector: 'app-favourit-home',
  templateUrl: './favourit-home.page.html',
  styleUrls: ['./favourit-home.page.scss'],
})
export class FavouritHomePage implements OnInit {
  cat: number ; 
  news: News[];
  analysis: Analysis[];
  recommendations: Recommendation[];
  new: News[];
  analysi: Analysis[];
  recommendation: Recommendation[];
  id: string ;
  constructor( private newsService: NewsService , private analysisService: AnalysisService , 
    private recommendationService: RecommendationService , private router: Router , 
    private activatedRouter: ActivatedRoute) { 
   this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.newsService.GetNews().subscribe(res =>{
       this.new = res ;
        this.news = [];
        for(let i = 0 ; i < this.new.length ; i++){
          if(this.new[i].cat.id == this.id){
            this.news.push(this.new[i]);
          }
        }
    this.analysisService.GetNews().subscribe(res =>{
       this.analysi = res ;
       this.analysis = [];
       for(let i = 0 ; i < this.analysi.length ; i++){
         if(this.analysi[i].cat.id == this.id){
           this.analysis.push(this.analysi[i]);
         }
       }
    this.recommendationService.GetNews().subscribe(res =>{
       this.recommendation = res ;
       this.recommendations = [];
       for(let i = 0 ; i < this.recommendation.length ; i++){
         if(this.recommendation[i].cat.id == this.id){
           this.recommendations.push(this.recommendation[i]);
         }
       }
    }, err =>{

    })
    } , err =>{

    });
    } , err =>{

    });
    this.cat = 0 ;
  }

  ngOnInit() {
  }
  OpenDetails(i: number , inddex: number){
    if(i == 0){ 
   this.newsService.setCat(this.news[inddex]);
   
   
    } else if(i == 1){
  this.analysisService.setCat(this.analysis[inddex]);
    } else if(i == 2){
      this.recommendationService.setCat(this.recommendations[inddex]);
    }
    this.router.navigate(['details' , {cat: i}]);
  }
}
