import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  iscreate: boolean ;
  isAdmin: boolean ;
  isGuest: boolean ;
  GetIsGuest():boolean{
    return this.isGuest ;
  }
  SetIsGuest(admin: boolean){
this.isGuest = admin ;
  }
  GetIsAdmin():boolean{
    return this.isAdmin ;
  }
  SetIsAdmin(admin: boolean){
this.isAdmin = admin ;
  }
  constructor(public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone ) { 
      
    }

    SignIn(email, password) : Promise<any>{
      this.iscreate = false ;
      return this.ngFireAuth.signInWithEmailAndPassword(email, password)
    }
  
    // Register user with email/password
    RegisterUser(email, password ): Promise<any> {
      this.iscreate = true ;
      return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
    }
}
