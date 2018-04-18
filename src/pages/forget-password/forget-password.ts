import { HomePage } from './../home/home';
import { CustomerEntityProvider } from './../../providers/customer-entity/customer-entity';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public customerEntityProvider: CustomerEntityProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  resetPassword() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    this.customerEntityProvider.doResetPassword(this.username).subscribe(
      response => {
        toast.setMessage("Password has been reset. Please check your email for the new password");
        toast.present();
        this.navCtrl.setRoot(HomePage);
      },
      error => {
        toast.setMessage("Unable to reset password");
        toast.present();
      }
    );
  }

}
