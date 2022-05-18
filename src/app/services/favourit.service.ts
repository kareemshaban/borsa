import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from './catgeory.service';
import { UserObj } from './user.service';
import { map, take } from 'rxjs/operators';
export interface Favourit {
  id?: string,
  user: UserObj ,
  cat: Category
}
@Injectable({
  providedIn: 'root'
})
export class FavouritService {
  favourits: Observable<Favourit[]>;
  favouritCollection: AngularFirestoreCollection<Favourit>;
  GetFavourits():  Observable<Favourit[]>{
    return this.favourits ;
  }
  constructor(private fireStore: AngularFirestore) { 
    this.favouritCollection = this.fireStore.collection<Favourit>('favourits');
    this.favourits = this.favouritCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  AddFavourit(fav: Favourit):Promise<DocumentReference>{
    return this.favouritCollection.add(fav);
  }
  deleteFavourit(id: string):Promise<void> {
    return this.favouritCollection.doc(id).delete();
  }

  
}
