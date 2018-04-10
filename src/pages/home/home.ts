import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { CreateAccountPage } from '../create-account/create-account';
import { CustomerEntityProvider } from '../../providers/customer-entity/customer-entity';
import { CustomerEntity } from '../../entities/CustomerEntity';
import { MainPage } from '../main/main';

import { ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: string;
  password: string;
  errorMessage: string;
  customerEntity: CustomerEntity;

  // a: any;

  constructor(public navCtrl: NavController, public customerEntityProvider: CustomerEntityProvider, private toastCtrl: ToastController) {

  }



  ionViewDidLoad() {
    if (sessionStorage.getItem('customerEntity') != null) {
      this.navCtrl.setRoot(MainPage);
    }
  }

  openForgetPasswordPage() {
    this.navCtrl.push(ForgetPasswordPage);
  }

  openCreateAccountPage() {
    this.navCtrl.push(CreateAccountPage);
  }

  openProfilePage(){
    this.navCtrl.setRoot(ProfilePage);
  }

  doLogin() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.username == null || this.password == null || this.username.trim() == "" || this.password == "") {

      toast.setMessage("Please fill in ");
      toast.present();
    } else {
      this.customerEntityProvider.doCustomerLogin(this.username, this.password).subscribe(
        response => {
          this.customerEntity = response.customerEntity;
          // this.a = response.customerEntity;
          sessionStorage.setItem("customerEntity", JSON.stringify(this.customerEntity));
          toast.setMessage("Welcome " + this.customerEntity.firstName);
          toast.present();
          this.navCtrl.setRoot(MainPage);
        }, error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
          toast.setMessage("Invalid login credentials");
          toast.present();
        })
    }
  }
}
