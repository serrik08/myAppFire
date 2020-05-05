import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { firebaseConfig } from '../../environment';


import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';


import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { AngularFireStorage } from '@angular/fire/storage';
// import { Observable } from 'rxjs';
// import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // private items: Observable<any[]>;
  username: string;
  // tasksRef: AngularFireList<any>;
  // tasks: Observable<any[]>;

  items: Observable<any[]>;
  noteCollection: AngularFirestoreCollection<any>;

  constructor(
    public afAuth: AngularFireAuth,
    // public db: AngularFireDatabase,
    public database: AngularFireDatabase,
    public afs: AngularFirestore,
    private navCtrl: NavController) { 
      // this.items = db.list('list').valueChanges();
      // window.sergio = this.db;
      
      this.noteCollection = this.afs.collection<any>('test');
      this.items = this.noteCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data}
          });
        })
      );
      console.dir(this.items);
      // this.tasksRef = this.database.list('tasks');
      // this.tasks = this.tasksRef.snapshotChanges()
      // .map(changes => {
      //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      // });
    }

  ngOnInit() {
  }

  getItems(): Observable<any[]> {
    console.log(this.items);
    return this.items;
  }

  addUser(n:string) {
    console.log("addUser: "+n);
    this.username = "";
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/users').add({
        name: n
      })
      .then(
        (res) => {
          console.dir(res);
          resolve(res);
        },
        err => {
          console.dir(err);
          reject(err);
        }
      )
    });
  }


  logout() {
    let res = this.afAuth.signOut();
    console.log(res);
    this.navCtrl.navigateRoot('');
  }

}
