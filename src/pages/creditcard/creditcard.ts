import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreditcardEntityProvider } from '../../providers/creditcard-entity/creditcard-entity';
import { CustomerEntity } from '../../entities/CustomerEntity';
import { AddcardPage } from '../addcard/addcard';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the CreditcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-creditcard',
  templateUrl: 'creditcard.html',
})
export class CreditcardPage {
  cardNum: String;
  cardName: String;
  cardExp: number;
  chosen: boolean;
  creditCards: any;
  errorMessage: String;
  customerEntity : CustomerEntity;
  radioGroup: String;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public creditCardEntityProvider: CreditcardEntityProvider, private toastCtrl: ToastController) {
      this.customerEntity = new CustomerEntity();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditcardPage');
    this.customerEntity = JSON.parse(sessionStorage.getItem('customerEntity'));
  this.creditCardEntityProvider.retrieveAllCreditCards(this.customerEntity.businessId).subscribe(
    response => {
      this.creditCards = response.creditCardEntities;
      console.log(response.creditCards)
    },
    error => {				
      this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
    }
  );
}

ionViewDidEnter() {
  this.creditCardEntityProvider.retrieveAllCreditCards(this.customerEntity.businessId).subscribe(
    response => {
      this.creditCards = response.creditCardEntities;
      console.log(response.creditCards)
    },
    error => {				
      this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
    }
  );

}

addCard() {
  this.navCtrl.push(AddcardPage);
}

selectedCard(event,creditcard) {
  let toast = this.toastCtrl.create({
    duration: 3000,
    position: 'bottom'
  });
  console.log(creditcard);
  this.creditCardEntityProvider.selectedCreditCard(this.customerEntity, creditcard).subscribe;
  toast.setMessage("Default payment method selected");
  toast.present();

}



}
