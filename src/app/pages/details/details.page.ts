import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Analysis, AnalysisService } from 'src/app/services/analysis.service';
import { News, NewsService } from 'src/app/services/news.service';
import { Recommendation, RecommendationService } from 'src/app/services/recommendation.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  cat: number ;
  title: string ;
  cata: string ;
  titlee: string ;
  details: string ;
  img: string = '';
  news: News ;
  analysis: Analysis ;
  shareTitle: string ;
  recommendation: Recommendation ;
  constructor(private activateRouter: ActivatedRoute , private newsService: NewsService , private analysisService: AnalysisService , 
    private recommendationService: RecommendationService , 
    private photoViewer: PhotoViewer , private socialSharing: SocialSharing) {
    this.cat = Number(this.activateRouter.snapshot.paramMap.get('cat').toString()) ;
    if(this.cat == 0){
      this.title = 'تفاصيل الخبر';
      this.shareTitle = 'New news now  in BorsaDailyEGX‏ Application';
      this.news = this.newsService.getNew();
      console.log(this.news);
      this.cata = this.news.cat.code + ' ' + this.news.cat.name ;
      this.titlee = this.news.title ;
      this.details = this.news.details ;
      this.news.watch += 1 ;
      this.img = '';
      this.newsService.updateDocument(this.news);
    }

    else if(this.cat == 1){
      this.title = 'تفاصيل التحليل';
      this.shareTitle = 'New Analysis now in BorsaDailyEGX‏  Application';
      this.analysis = this.analysisService.getNew();
      this.cata = this.analysis.cat.code + ' ' + this.analysis.cat.name ;
      this.titlee = this.analysis.title ;
      this.details = this.analysis.details ;
      this.img = this.analysis.img;
      this.analysis.watch += 1 ;
      this.analysisService.updateDocument(this.analysis);
    }
   
    else if(this.cat == 2){
      this.title = 'تفاصيل التوصية';
      this.shareTitle = 'New Recommendation now in BorsaDailyEGX‏  Application';
      this.recommendation = this.recommendationService.getRecommendation();
      this.cata = this.recommendation.cat.code + ' ' + this.recommendation.cat.name ;
      this.titlee = this.recommendation.title ;
      this.details = this.recommendation.details ;
      this.recommendation.watch += 1 ;
      this.img = '';
      this.recommendationService.updateDocument(this.recommendation);
    }
  

    console.log(this.cat);
  }
  OpenImage(url: string){
    this.photoViewer.show(url);

  }

  ngOnInit() {
  }
Share(){
  this.socialSharing.share(this.shareTitle, this.cata, '', 
  'https://play.google.com/store/apps/details?id=com.app.boras.dialy.app').then(res =>{
     console.log(res);
  }).catch(e => {
   console.log(e);
  });
}
}
