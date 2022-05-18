import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
export interface Category {
  id?: string,
  name: string,
  code: string,
  img: string
}
@Injectable({
  providedIn: 'root'
})

export class CatgeoryService {
  categories: Observable<Category[]>;
  cat: Category ;
  getCat(): Category {
    return this.cat ;
  }
  setCat(c: Category){
    this.cat = c ;
  }
  GetCategories(): Observable< Category[]>{
    return this.categories ;
  }
  categoryCollection: AngularFirestoreCollection<Category>;
  constructor(private fireStore: AngularFirestore) { 
    this.categoryCollection = this.fireStore.collection<Category>('categories');
    this.categories = this.categoryCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  CreatUserDocument(user: Category):Promise<DocumentReference> {
    return this.categoryCollection.add(user);
  }
  updateCategory(category: Category): Promise<void> {
    return this.categoryCollection.doc(category.id).update({ name: category.name, code: category.code });
  }
 
  deleteCategory(id: string): Promise<void> {
    return this.categoryCollection.doc(id).delete();
  }
}
