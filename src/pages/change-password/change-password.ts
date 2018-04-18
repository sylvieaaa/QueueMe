import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity'
import { CustomerEntityProvider } from '../../providers/customer-entity/customer-entity';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  customerEntity: CustomerEntity;
  oldPassword: string = "";
  newPassword: string = "";
  cfmPassword: string = "";
  infoMessage: string;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public customerEntityProvider: CustomerEntityProvider,
    private toastCtrl: ToastController) {
    this.customerEntity = new CustomerEntity();
    this.customerEntity = JSON.parse(localStorage.getItem('customerEntity'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }


  editPassword() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.oldPassword === "" || this.cfmPassword === "" || this.newPassword === "") {
      toast.setMessage("Form not complete, please fill in");
      toast.present();
    }
    else if (this.cfmPassword != this.newPassword) {
      toast.setMessage("Password do not match. Please re-enter password.");
      toast.present();
    }
    else {
      this.customerEntityProvider.updateCustomerPassword(this.customerEntity, this.oldPassword, this.newPassword).subscribe(
        response => {
          toast.setMessage("Password Updated!");
          toast.present();
        },
        error => {
          toast.setMessage("Old password is wrong! Please try again.")
          toast.present();
          this.infoMessage = null;
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
  }
}
