import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private username: string;
  private password: string;
  private cpassword: string;

  constructor(
    public afAuth: AngularFireAuth,
    private navCtrl: NavController) {}

  ngOnInit() {
  }

  async register() {
    const { username, password, cpassword } = this;
    if (password !== cpassword){
      return console.error("Passwords don't match");
    }
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(username,password);
      console.log(res);
    } catch(err) {
      console.dir(err);
    }
  }
  
  login() {
    this.navCtrl.navigateForward('/login');
  }

}
