import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { CreateAccountPage } from '../create-account/create-account';
import { CustomerEntityProvider } from '../../providers/customer-entity/customer-entity';
import { CustomerEntity } from '../../entities/CustomerEntity';
import { MainPage } from '../main/main';

import { ToastController } from 'ionic-angular';

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

  toast = this.toastCtrl.create({
    duration: 3000,
    position: 'bottom'
  });

  ionViewDidLoad() {
    if(sessionStorage.getItem('customerEntity') != null) {
      this.navCtrl.setRoot(MainPage);
    }
  }

  openForgetPasswordPage() {
    this.navCtrl.push(ForgetPasswordPage);
  }

  openCreateAccountPage() {
    this.navCtrl.push(CreateAccountPage);
  }

  doLogin() {
    this.customerEntityProvider.doCustomerLogin(this.username, this.password).subscribe(
      response => {
        this.customerEntity = response.customerEntity;
        // this.a = response.customerEntity;
        sessionStorage.setItem("customerEntity", JSON.stringify(this.customerEntity));
        this.toast.setMessage("Welcome " + this.customerEntity.firstName);
        this.toast.present();
        this.navCtrl.setRoot(MainPage);
      }, error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        this.toast.setMessage("Invalid login credentials");
        this.toast.present();
      }
    )
  }
}
