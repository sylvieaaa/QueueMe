import { CheckoutProvider } from './../../providers/checkout/checkout';
import { SaleTransactionEntity } from './../../entities/SaleTransactionEntity';
import { SaleTransactionLineItemEntity } from './../../entities/SaleTransactionLineItemEntity';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity';

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
  shoppingCart: any;
  foodcourtId: any;
  haveItems: boolean = false;
  lineItems: Array<SaleTransactionLineItemEntity>;

  totalLineItems: number;
  totalQuantity: number;
  totalAmount: number;
  diningOptions: boolean;
  paymentType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public checkoutProvider: CheckoutProvider, private toastCtrl: ToastController) {
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
    saleTransactionEntity.totalQuantity = this.totalQuantity;
    saleTransactionEntity.totalLineItem = this.totalLineItems;
    saleTransactionEntity.transactionDateTime = new Date();
    saleTransactionEntity.saleTransactionLineItemEntities = this.lineItems;
    let customerEntity: CustomerEntity = JSON.parse(sessionStorage.getItem("customerEntity"));

    this.checkoutProvider.doCheckout(saleTransactionEntity, customerEntity).subscribe(
      response => {
        toast.setMessage(response);
        toast.present();
      }, error => {
        toast.setMessage("HTTP " + error.status + ": " + error.error.message);
        toast.present();
      })
  }
}
