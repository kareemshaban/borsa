import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from './catgeory.service';
import { map, take } from 'rxjs/operators';
export interface Analysis {
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
export class AnalysisService {
  analysiss: Observable<Analysis[]>;
  analysis: Analysis ;
  getNew(): Analysis {
    return this.analysis ;
  }
  setCat(c: Analysis){
    this.analysis = c ;
  }
  GetNews(): Observable< Analysis[]>{
    return this.analysiss ;
  }
  newsCollection: AngularFirestoreCollection<Analysis>;
  constructor(private fireStore: AngularFirestore) { 
    this.newsCollection = this.fireStore.collection<Analysis>('analysis' , ref => ref.orderBy('date' , 'desc'));
    this.analysiss = this.newsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  CreatDocument(user: Analysis):Promise<DocumentReference> {
    return this.newsCollection.add(user);
  }
  updateDocument(category: Analysis): Promise<void> {
    return this.newsCollection.doc(category.id).update({ title: category.title, details: category.details , watch: category.watch , 
    cat: category.cat , img: category.img });
  }
 
  deleteDocument(id: string): Promise<void> {
    return this.newsCollection.doc(id).delete();
  }
}
