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
  creditCardId: any;
  cardExp: number;
  chosen: boolean;
  creditCards: any;
  errorMessage: String;
  customerEntity: CustomerEntity;
  radioGroup: String;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public creditCardEntityProvider: CreditcardEntityProvider, private toastCtrl: ToastController) {
    this.customerEntity = JSON.parse(localStorage.getItem('customerEntity'));
    this.creditCardEntityProvider.retrieveAllCreditCards(this.customerEntity.businessId).subscribe(
      response => {
        this.creditCards = response.creditCardEntities;
        this.checkDefaultCard();
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    );
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.creditCardEntityProvider.retrieveAllCreditCards(this.customerEntity.businessId).subscribe(
      response => {
        this.creditCards = response.creditCardEntities;
        this.checkDefaultCard();
        console.log(response.creditCards)
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    );

  }

  checkDefaultCard() {
    for (var i = 0; i < this.creditCards.length; i++) {
      if (this.creditCards[i].defaultCard) {
        this.radioGroup = this.creditCards[i].creditCardId;
        return;
      }
    }
  }

  addCard() {
    this.navCtrl.push(AddcardPage);
  }

  selectedCard(event, creditcard) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    this.creditCardEntityProvider.selectedCreditCard(this.customerEntity, creditcard).subscribe(
      response => {

        toast.setMessage("Default credit card selected");
        toast.present();
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    );
  }

  deleteCard(event, creditcard) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    this.creditCardEntityProvider.deleteCreditCard(creditcard.creditCardId).subscribe(
      response => {
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        toast.setMessage("Card deleted!");
        toast.present();
      }, error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        toast.setMessage("Unable to delete account");
        toast.present();
      }
    );
  }
}
