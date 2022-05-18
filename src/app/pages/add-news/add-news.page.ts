import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category, CatgeoryService } from 'src/app/services/catgeory.service';
import { News, NewsService } from 'src/app/services/news.service';
import { Notification, NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.page.html',
  styleUrls: ['./add-news.page.scss'],
})
export class AddNewsPage implements OnInit {
  categories: Category[];
  fillteredCats: Category[];
  loaded: boolean = true;
  news: News ={
    title: '' , 
    details: '' , 
    cat: null , 
    date: new Date() ,
    img: '' ,
    watch: 0
  }
  value: any ;
  cat: number ;
  title: string ;
  details: string ;
  search: string ; 
  notification: Notification ={
    title: '' , 
    details: '',
    date: new Date() ,
    users: []
  };
  constructor(private categoryService: CatgeoryService , private newsService: NewsService , 
    private toastControl: ToastController , private router: Router , private notificationService: NotificationService) {
   
      this.categoryService.GetCategories().subscribe(res =>{
      this.categories = res ;
      this.fillteredCats = res ;
    });
   }
   AddNew(){
    this.loaded = false ;
    this.news ={
      title: this.title , 
      details:this.details ,
      cat: this.fillteredCats[this.cat] ,
      date: new Date() ,
      img: '' , 
      watch: 0
    }
    this.notification = {
      title: 'News Recentally added to Our App' , 
      details: this.title,
      date: new Date() ,
      users: []
    }
    this.newsService.CreatDocument(this.news).then(res =>{
     this.loaded = true ;
     this.presentToast('Done!' , 'success' , 3000);
      this.notificationService.CreatDocument(this.notification);
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
