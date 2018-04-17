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
      this.saleTransactionEntity= this.navParams.get('saleTransactionEntity');
      console.log(this.saleTransactionEntity);
   this.saleTransactionId = this.saleTransactionEntity.saleTransactionId;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowOrderPage');
    this.orderEntityProvider.retrieveAllOrders(this.saleTransactionId).subscribe(
      response => { 
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
