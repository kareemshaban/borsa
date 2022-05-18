import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from './catgeory.service';
import { map, take } from 'rxjs/operators';
export interface Recommendation {
  id?: string,
  title: string,
  details: string,
  img: string ,
  watch: number ,
  date: any ,
  cat: Category , 
  state: string
}
@Injectable({
  providedIn: 'root'
})

export class RecommendationService {
  recommendations: Observable<Recommendation[]>;
  recommendation: Recommendation ;
  getRecommendation(): Recommendation {
    return this.recommendation ;
  }
  setCat(c: Recommendation){
    this.recommendation = c ;
  }
  GetNews(): Observable< Recommendation[]>{
    return this.recommendations ;
  }
  recommendationCollection: AngularFirestoreCollection<Recommendation>;
  constructor(private fireStore: AngularFirestore) { 
    this.recommendationCollection = this.fireStore.collection<Recommendation>('recommednations' , ref => ref.orderBy('date' , 'desc'));
    this.recommendations = this.recommendationCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  CreatDocument(user: Recommendation):Promise<DocumentReference> {
    return this.recommendationCollection.add(user);
  }
  updateDocument(category: Recommendation): Promise<void> {
    return this.recommendationCollection.doc(category.id).update({ title: category.title, details: category.details ,
       watch: category.watch , state: category.state,
    cat: category.cat , img: category.img });
  }
 
  deleteDocument(id: string): Promise<void> {
    return this.recommendationCollection.doc(id).delete();
  }
}
