import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from './catgeory.service';
import { UserObj } from './user.service';
import { map, take } from 'rxjs/operators';

export interface Order {
  id?: string,
  user: UserObj,
  cat: Category,
  msg: string , 
  date: any ,
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Observable<Order[]>;
  order: Order ;
  getCat(): Order {
    return this.order ;
  }
  setCat(c: Order){
    this.order = c ;
  }
  GetCategories(): Observable< Order[]>{
    return this.orders ;
  }
  categoryCollection: AngularFirestoreCollection<Order>;
  constructor(private fireStore: AngularFirestore) { 
    this.categoryCollection = this.fireStore.collection<Order>('orders');
    this.orders = this.categoryCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  
  
  }
  CreatUserDocument(user: Order):Promise<DocumentReference> {
    return this.categoryCollection.add(user);
  }
  updateCategory(category: Order): Promise<void> {
    return this.categoryCollection.doc(category.id).update({ user: category.user, cat: category.cat , msg: category.msg });
  }
 
  deleteCategory(id: string): Promise<void> {
    return this.categoryCollection.doc(id).delete();
  }
}
