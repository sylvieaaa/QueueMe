import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity';
import { OrderEntityProvider } from '../../providers/order-entity/order-entity';


/**
 * Generated class for the ModalOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-order',
  templateUrl: 'modal-order.html',
})
export class ModalOrderPage {

  // customerEntity: CustomerEntity;
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
   this.saleTransactionId = this.saleTransactionEntity.saleTransactionId;
  //  this.saleTransactionLineItemEntities = this.saleTransactionEntity.saleTransactionLineItemEntities;
  //  for (let stli2 of this.saleTransactionLineItemEntities) {
  //   this.selectedVendor = stli2.menuItemEntity.vendorEntity;
  //  }
   console.log("this is the passed sale transaction id: " + this.saleTransactionId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalOrderPage');
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

  closeModal(){
    this.view.dismiss();
  }
}
