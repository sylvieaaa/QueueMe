import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CustomerEntityProvider } from '../../providers/customer-entity/customer-entity';
import { CustomerEntity } from '../../entities/CustomerEntity';
import { ToastController } from 'ionic-angular';
import { Directive, HostBinding, ElementRef } from '@angular/core';

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  passwordType: string = 'password';
  passwordShown: boolean = false;
  errorMessage: string;
  customerEntity: CustomerEntity;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public customerEntityProvider: CustomerEntityProvider,
    private toastCtrl: ToastController) {
    this.customerEntity = new CustomerEntity();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  openHomePage() {
    this.navCtrl.push(HomePage);
  }

  togglePassword(){
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  createAccount() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    console.log(this.customerEntity.password);
    this.customerEntityProvider.createAccount(this.customerEntity).subscribe(
      response => {
        toast.setMessage("Account successfully created");
        toast.present();
        this.navCtrl.setRoot(HomePage);
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        toast.setMessage("Unable to create account");
        toast.present();
      }
    );
  }
}
