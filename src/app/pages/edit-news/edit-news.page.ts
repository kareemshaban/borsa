import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category, CatgeoryService } from 'src/app/services/catgeory.service';
import { News, NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.page.html',
  styleUrls: ['./edit-news.page.scss'],
})
export class EditNewsPage implements OnInit {
  categories: Category[];
  loaded: boolean = true;
  news: News ={
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
  neww: News ={
    title: '' , 
    details: '' ,
    date: new Date ,
    img: '' ,
    watch: 0 ,
    cat: null
  };
  constructor(private categoryService: CatgeoryService , private newsService: NewsService , 
    private toastControl: ToastController , private router: Router) {
     
    this.categoryService.GetCategories().subscribe(res =>{
      this.categories = res ;
      this.neww = this.newsService.getNew();
      this.title = this.neww.title ;
      this.details = this.neww.details ;
      for(let i = 0 ; i < this.categories.length ; i++){
        if(this.neww.cat.id == this.categories[i].id){
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
     this.neww.details = this.details ;
     this.neww.title = this.title ;
     this.neww.cat = this.categories[this.cat];
     this.newsService.updateDocument(this.neww).then(res =>{
      this.loaded = true ;
      this.presentToast('Done!' , 'success' , 3000);
      this.router.navigateByUrl('news');
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
