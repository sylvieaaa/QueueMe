import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { CreateAccountPage } from '../create-account/create-account';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openForgetPasswordPage() {
    this.navCtrl.push(ForgetPasswordPage);
  }

  openCreateAccountPage() {
    this.navCtrl.push(CreateAccountPage);
  }

}
