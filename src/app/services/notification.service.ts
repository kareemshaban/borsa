import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../Model/User';
import { AuthService } from './auth.service';
import { UserObj } from './user.service';

export interface Notification {
  id?: string,
  title: string,
  details: string,
  date: Date ,
  users: string[]
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  newss:Observable< Notification[]>;
  newsCollection: AngularFirestoreCollection<Notification>;
  notifictions: Notification[] ;
  email: string ;
  GetNotifications(): Observable<Notification[]>{
    return this.newss ;
  }

  constructor(private fireStore: AngularFirestore , private localnotification:LocalNotifications , 
    private platform: Platform , private authService: AuthService) { 
      this.newsCollection = this.fireStore.collection<Notification>('notification' , ref => ref.orderBy('date' , 'desc'));
      this.newss = this.newsCollection.snapshotChanges().pipe(
     
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
        
      );
      if(!this.authService.GetIsAdmin()){
        this.email = localStorage.getItem('email') ;
      this.newss.subscribe(res => {
       this.notifictions = res ;
       if(this.notifictions.length > 0){
          if(this.notifictions.filter(c=> c.users.filter( d => d != this.email) || c.users.length == 0).length > 0){
            this.showNotification(this.notifictions[0].title , this.notifictions[0].details);
          }
    
         
       
       }
      });
    }
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
        icon:'../../assets/images/logo.png'
      });

    }
    CreatDocument(user: Notification):Promise<DocumentReference> {
      return this.newsCollection.add(user);
    }
    updateDocument(category: Notification): Promise<void> {
      return this.newsCollection.doc(category.id).update({ title: category.title, details: category.details , users: category.users , 
      date: category.date  });
    }
}
