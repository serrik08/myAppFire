import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username: string = "";
  private password: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  async login() {
    const { username, password } = this;
    try {
      const res = await this.afAuth.signInWithEmailAndPassword( username, password);
      console.log(res);
      this.navCtrl.navigateForward('/home');
    } catch(err) {
      console.dir(err);
    }
  }

  signup(){
      this.navCtrl.navigateForward('/register');
  }

  logout() {
    this.afAuth.signOut();
  }

}
