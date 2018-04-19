import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity';
import { OrderEntityProvider } from '../../providers/order-entity/order-entity';

/**
 * Generated class for the ShowOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-show-order',
  templateUrl: 'show-order.html',
})
export class ShowOrderPage {
  orderEntities: any;
  errorMessage: String;
  saleTransactionId: any;
  saleTransactionEntity: any;
  saleTransactionLineEntities: any;
  selectedSaleTransactionLineItemEntity: any;
  selectedMenuItemEntity: any;

  constructor(public navParams: NavParams, public view: ViewController, private toastCtrl: ToastController,
    public orderEntityProvider: OrderEntityProvider) {
    this.saleTransactionEntity = this.navParams.get('saleTransactionEntity');
    if(this.saleTransactionEntity == null) {
      console.log("1 aa");
      console.log(sessionStorage.getItem("showOrderPage"));
      this.saleTransactionEntity = JSON.parse(sessionStorage.getItem("showOrderPage"));
      sessionStorage.removeItem("showOrderPage");
    }
    console.log(this.saleTransactionEntity.saleTransactionId);
    this.saleTransactionId = this.saleTransactionEntity.saleTransactionId;
    console.log(this.saleTransactionId + " here");
  }

  ionViewDidLoad() {
    let customerEntity: CustomerEntity = JSON.parse(localStorage.getItem("customerEntity"));
    console.log('ionViewDidLoad ShowOrderPage');
    this.orderEntityProvider.retrieveAllOrders(this.saleTransactionId, customerEntity.businessId).subscribe(
      response => {
        console.log(response);
        this.orderEntities = response.orderEntities;
        for (let orderEntity of this.orderEntities) {
          this.saleTransactionLineEntities = orderEntity.saleTransactionLineItemEntities;
          for (let stlie of this.saleTransactionLineEntities) {
            this.selectedSaleTransactionLineItemEntity = stlie;
          }
        }
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    );
  }
}
