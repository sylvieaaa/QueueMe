import { CheckoutProvider } from './../../providers/checkout/checkout';
import { SaleTransactionEntity } from './../../entities/SaleTransactionEntity';
import { SaleTransactionLineItemEntity } from './../../entities/SaleTransactionLineItemEntity';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity';
import { CreditcardEntityProvider } from '../../providers/creditcard-entity/creditcard-entity';

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {
  cvv: string ="";
  expDate: any;
  cardName: string = "";
  cardNum: string = "";
  saveCreditCard: boolean;
  allowCheckOut:boolean;

  customerEntity: CustomerEntity;
  shoppingCart: any;
  foodcourtId: any;
  specialRequest: string;
  haveItems: boolean = false;
  lineItems: Array<SaleTransactionLineItemEntity>;

  totalLineItems: number;
  totalQuantity: number;
  totalAmount: number;
  diningOptions: boolean;
  paymentType: string;
  creditCards: any;
  errorMessage: any;
  radioGroup: any;
  creditCard: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public checkoutProvider: CheckoutProvider,
    private toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController,
    public creditCardEntityProvider: CreditcardEntityProvider, public alertCtrl: AlertController) {
    this.creditCard = null;
    this.allowCheckOut = true;
    if (sessionStorage.getItem("shoppingCart") != null) {
      this.shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"));
      this.foodcourtId = this.shoppingCart.foodcourtId;
      this.lineItems = this.shoppingCart.saleTransactionLineItems;
      if (this.lineItems.length > 0) {
        this.haveItems = true;
        this.initValues();
      } else {
        this.haveItems = false;
      }
    }
    this.customerEntity = JSON.parse(sessionStorage.getItem('customerEntity'));
    this.creditCardEntityProvider.retrieveAllCreditCards(this.customerEntity.businessId).subscribe(
      response => {
        this.creditCards = response.creditCardEntities;
        this.checkDefaultCard();
        this.creditCard = this.radioGroup;
        console.log(this.creditCards);
        console.log(this.creditCard);
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

  initValues() {
    this.totalAmount = 0;
    this.totalQuantity = 0;
    this.totalLineItems = this.lineItems.length;
    for (let item of this.lineItems) {
      this.totalQuantity += item.quantity;
      this.totalAmount += item.subTotal;
    }

  }

  checkDefaultCard() {
    for (var i = 0; i < this.creditCards.length; i++) {
      if (this.creditCards[i].defaultCard) {
        this.radioGroup = this.creditCards[i];
        return;
      }
    }
  }

  removeItem(lineItem: SaleTransactionLineItemEntity) {
    let index = lineItem.serialNumber - 1;
    let newLineItems: Array<SaleTransactionLineItemEntity> = [];
    this.totalLineItems--;
    this.totalQuantity -= lineItem.quantity;
    this.totalAmount -= lineItem.subTotal;
    for (var i = 0; i < this.lineItems.length; i++) {
      if (i == index) {
        continue;
      } else if (i > index) {
        this.lineItems[i].serialNumber = i;
      }
      console.log(this.lineItems[i]);
      newLineItems.push(this.lineItems[i]);
    }
    this.lineItems = newLineItems;
    this.shoppingCart.saleTransactionLineItems = this.lineItems;
    sessionStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
  }

  doCheckout() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

    let saleTransactionEntity: SaleTransactionEntity = new SaleTransactionEntity();
    saleTransactionEntity.totalAmount = this.totalAmount;
    saleTransactionEntity.isTakeaway = this.diningOptions;
    console.log("Check dining options:");
    console.log(this.diningOptions);
    saleTransactionEntity.totalQuantity = this.totalQuantity;
    saleTransactionEntity.totalLineItem = this.totalLineItems;
    saleTransactionEntity.transactionDateTime = new Date();
    saleTransactionEntity.saleTransactionLineItemEntities = this.lineItems;
    let customerEntity: CustomerEntity = JSON.parse(sessionStorage.getItem("customerEntity"));

    if (this.diningOptions === undefined) {
      toast.setMessage("Please fill in dining options!");
      toast.present();
    }
    else if (this.creditCard === undefined && (this.cardName === "" || this.cardNum === "")) {
      toast.setMessage("Please ensure your card details are filled");
      toast.present();
    }
    else if (this.cvv === "" || this.expDate === undefined) {
      toast.setMessage("Please check if you have filled in cvv or expiry date");
      toast.present();
    }

    else {
      if (this.saveCreditCard === true) {
        this.createCard();
        if (this.allowCheckOut === false){
          return;
        }
      }

      this.checkoutProvider.doCheckout(saleTransactionEntity, customerEntity).subscribe(
        response => {
          toast.setMessage("Successfully checked out!");
          toast.present();
          this.navCtrl.pop();
        }, error => {
          toast.setMessage("HTTP " + error.status + ": " + error.error.message);
          toast.present();
        
        })

    }
  }

  // alertCreditConfirm() {
  //   console.log("reached");
  //   let alert = this.alertCtrl.create({
  //     title: 'Save card payment',
  //     message: 'Do you want to save your details?',
  //     buttons: [
  //       {
  //         text: 'Agree',
  //         handler: () => {
  //           console.log("agree clicked");
  //           this.createCard();
  //         }
  //       },
  //       {
  //         text: 'Disagree',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log("cancel clicked");

  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  showActionSheet() {
    let actionSheet = this.actionSheetCtrl.create(
      {
        title: 'Please select credit card to make payment',
        cssClass: 'action-sheets-basic-page',

      });

    for (let cc of this.creditCards) {
      var button = {
        text: cc.cardNo,
        handler: () => {
          console.log(cc)
          this.showAlert("Credit payment changed", cc);
        }
      }
      actionSheet.addButton(button);
    }


    actionSheet.present();
  }


  showAlert(title: string, card: any) {
    if (this.creditCard != card) {

      let alert = this.alertCtrl.create(
        {
          title: title,
          buttons: ['OK']
        });
      this.creditCard = card;
      alert.present();
    }


  }

  createCard() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    console.log(this.creditCards);

    if (this.creditCards != null) {
      for (let creditCard of this.creditCards) {
        if (creditCard.cardNo == this.cardNum) {
          this.allowCheckOut=false;
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
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )

  }

  qtyChanged(event, selectLineItem, qty){
    // console.log("i have come here");
    for (let lineItem of this.lineItems){
      if (lineItem === selectLineItem){
        console.log(lineItem.quantity);
        console.log(qty);
        console.log(lineItem.quantity);
        let diffQty = lineItem.quantity - qty;
        console.log(diffQty);
        this.totalQuantity += diffQty;
        lineItem.quantity = qty;
        lineItem.subTotal += (parseFloat(lineItem.menuItemEntity.price) * diffQty);
        
        this.totalAmount += lineItem.subTotal;
        console.log(lineItem.subTotal);
      }
    }
  }


}
