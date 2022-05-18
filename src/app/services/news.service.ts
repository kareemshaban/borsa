import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Category } from './catgeory.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';

export interface News {
  id?: string,
  title: string,
  details: string,
  img: string ,
  watch: number ,
  date: any ,
  cat: Category
}
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  newss: Observable<News[]>;
  news: News ;
  getNew(): News {
    return this.news ;
  }
  setCat(c: News){
    this.news = c ;
  }
  GetNews(): Observable< News[]>{
    return this.newss ;
  }
  newsCollection: AngularFirestoreCollection<News>;
  constructor(private fireStore: AngularFirestore , private localnotification:LocalNotifications , 
    private platform: Platform) { 
    this.newsCollection = this.fireStore.collection<News>('news' , ref => ref.orderBy('date' , 'desc'));

    this.newss = this.newsCollection.snapshotChanges().pipe(
      map(actions => { 
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
      
    );
  }
  showNotification(title: string, msg: string ){
    this.localnotification.schedule({
      id: 1,
      title:title  ,
      text: msg ,
      sound: this.platform.is('android')? 'file://sound.mp3': 'file://beep.caf',
      data: { secret: 'key' } , 
      foreground: true ,
      lockscreen: true,
      vibrate: true,
      wakeup: true,
    });
  //  alert(msg);
  }
  CreatDocument(user: News):Promise<DocumentReference> {
    return this.newsCollection.add(user);
  }
  updateDocument(category: News): Promise<void> {
    return this.newsCollection.doc(category.id).update({ title: category.title, details: category.details , watch: category.watch , 
    cat: category.cat , img: category.img });
  }
 
  deleteDocument(id: string): Promise<void> {
    return this.newsCollection.doc(id).delete();
  }
}
