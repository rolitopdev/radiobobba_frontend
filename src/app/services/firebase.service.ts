import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  // Obtener todos los documentos de una colección
  getItems(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges();
  }

}
