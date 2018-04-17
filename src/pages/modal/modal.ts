import { SaleTransactionEntity } from './../../entities/SaleTransactionEntity';
import { SaleTransactionLineItemEntity } from './../../entities/SaleTransactionLineItemEntity';
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { splitClasses } from '@angular/compiler';
import { myIPAddress } from './../../ipAddress';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  myIPAddress: string = new myIPAddress().ipaddress;
  shoppingCart: any;
  menuItem:any;
  data:any;
  quantity: number;
  specialRequest: string;

  constructor(public navParams: NavParams, public view: ViewController, private toastCtrl: ToastController) {
    this.menuItem= this.navParams.get('data');
    this.quantity = 1;
    console.log(this.menuItem);
    if(sessionStorage.getItem("shoppingCart") == null) {
     this.initShoppingCart();
    } else {
      let foodcourt:any = JSON.parse(sessionStorage.getItem("foodCourt"));
      console.log(foodcourt);
      this.shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"));
      if(foodcourt.businessId != this.shoppingCart.foodcourtId) {
        this.initShoppingCart();
      }
    }
  }

  initShoppingCart() {
    let foodcourt:any = JSON.parse(sessionStorage.getItem("foodCourt"));
    let saleTransactionLineItems: Array<SaleTransactionLineItemEntity> = [];
    let shoppingCartJSON = {"foodcourtId" : foodcourt.businessId, "saleTransactionLineItems" : saleTransactionLineItems};
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCartJSON));
    this.shoppingCart = shoppingCartJSON;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  
  }

  addItemToCart() {
    console.log(this.shoppingCart);
    let saleTransactionLineItems:Array<SaleTransactionLineItemEntity> = this.shoppingCart.saleTransactionLineItems;
    console.log(saleTransactionLineItems);
    let serialNum: number = saleTransactionLineItems.length + 1;
    let lineItem = new SaleTransactionLineItemEntity();
    lineItem.serialNumber = serialNum;
    lineItem.menuItemEntity = this.menuItem;
    lineItem.quantity = this.quantity;
    lineItem.specialRequest = (this.specialRequest == null ? "" : this.specialRequest);
    lineItem.unitPrice = this.menuItem.price;
    lineItem.subTotal = parseFloat(this.menuItem.price) * this.quantity;
    saleTransactionLineItems.push(lineItem);
    this.shoppingCart.saleTransactionLineItems = saleTransactionLineItems;
    sessionStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
    console.log(saleTransactionLineItems);
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    toast.setMessage("Added to cart successfully!");
    toast.present();
    this.closeModal();
  }

  closeModal(){
    this.view.dismiss();
  }

}
