import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore ) { }

  getuser() { 
    return this.firestore.collection("user").snapshotChanges();
  }


}
