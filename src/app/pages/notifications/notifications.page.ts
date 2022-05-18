import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService , Notification } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications: Notification[] = [];
  _notifications: Notification[] = [];
  email: string = '' ;
  notification: Notification ={
    id: '',
    title: '' , 
    details: '',
    date: new Date() ,
    users: []
  };
  constructor(private notificationService:NotificationService , private router: Router) { 
    this.email = localStorage.getItem('email') ;
    this.notificationService.GetNotifications().subscribe(res =>{
      this._notifications = res ;

     this.notifications= this._notifications.filter(c=> c.users.length == 0  || !c.users.includes(this.email));
     console.log(this.notifications);
    } , err =>{
      
    });
   
  }

  ngOnInit() {
  }
  MakAsRead(){
    for(let i = 0 ; i < this.notifications.length ; i++){

      this.notifications[i].users.push( this.email ) ;
      this.notification ={
        id: this.notifications[i].id ,
        title: this.notifications[i].title , 
        details: this.notifications[i].details,
        date: this.notifications[i].date ,
        users: this.notifications[i].users 
      };

      this.notificationService.updateDocument( this.notification);
    }
    this.router.navigateByUrl('');
  }
}
