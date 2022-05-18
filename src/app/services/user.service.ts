import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { User } from '../Model/User';
import { map, take } from 'rxjs/operators';
import { Category } from './catgeory.service';
export interface UserObj {
  id?: string,
  name: string,
  email: string, 
  password: string ,
  uid: string
} 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  users: Observable<UserObj[]>;
  userCollection: AngularFirestoreCollection<UserObj>;
  user: User;
  getUsers(): Observable<UserObj[]>{
    return this.users ;
  }
  uid: string ;
  constructor(private fireStore: AngularFirestore) { 
    this.userCollection = this.fireStore.collection<UserObj>('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  CreatUserDocument(user: UserObj):Promise<DocumentReference> {
    return this.userCollection.add(user);
  }
}
