import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity';
import { ToastController } from 'ionic-angular';
import { CreditcardEntityProvider } from '../../providers/creditcard-entity/creditcard-entity';


/**
 * Generated class for the AddcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addcard',
  templateUrl: 'addcard.html',
})
export class AddcardPage {
  customerEntity : CustomerEntity;
  cardName: String;
  cardNum: String;
  errorMessage: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, public creditCardEntityProvider: CreditcardEntityProvider) {
    this.customerEntity = new CustomerEntity();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcardPage');
    this.customerEntity = JSON.parse(sessionStorage.getItem('customerEntity'));   
  }

  createCard() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    this.creditCardEntityProvider.createCard(this.cardNum, this.cardName, this.customerEntity).subscribe(
      response => {
        toast.setMessage("Card successfully added!");
         toast.present();
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )
  }

  }
