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
  customerEntity: CustomerEntity;
  cardName: String;
  cardNum: String;
  errorMessage: string;
  creditCards: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, public creditCardEntityProvider: CreditcardEntityProvider) {
    this.customerEntity = new CustomerEntity();

    this.customerEntity = JSON.parse(sessionStorage.getItem('customerEntity'));
    this.creditCardEntityProvider.retrieveAllCreditCards(this.customerEntity.businessId).subscribe(
      response => {
        this.creditCards = response.creditCardEntities;
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }

    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcardPage');
    this.customerEntity = JSON.parse(sessionStorage.getItem('customerEntity'));
  }

  createCard() {
    console.log(this.cardNum);

    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    console.log(this.creditCards);
    
    if (this.creditCards != null) {
      for (let creditCard of this.creditCards) {
        if (creditCard.cardNo == this.cardNum){
          toast.setMessage("Card already exist");
          toast.present();
          return;
        }
        console.log(creditCard);
      }
    }
  
      this.creditCardEntityProvider.createCard(this.cardNum, this.cardName, this.customerEntity).subscribe(
        response => {
          toast.setMessage("Card successfully added!");
          toast.present();
          this.navCtrl.pop();
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      )
    
    
  }

}
