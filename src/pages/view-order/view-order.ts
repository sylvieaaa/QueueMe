import { myIPAddress } from './../../ipAddress';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity';
import { ToastController } from 'ionic-angular';
import { OrderEntityProvider } from '../../providers/order-entity/order-entity';
import { ModalOrderPage } from '../../pages/modal-order/modal-order';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the ViewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-order',
  templateUrl: 'view-order.html',
})
export class ViewOrderPage {
  myIPAddress: string = new myIPAddress().ipaddress;
  customerEntity: CustomerEntity;
  saleTransactionEntities: any;
  stliEntities: any;
  selectedSaleTransactionLineItem: any;
  selectedMenuItem: any;
  selectedVendor: any;
  selectedFoodCourt: any;
  errorMessage: String;
  

  constructor(public modal: ModalController, public navCtrl: NavController, public navParams: NavParams,  private toastCtrl: ToastController,
    public orderEntityProvider: OrderEntityProvider) {
      this.customerEntity = JSON.parse(localStorage.getItem('customerEntity'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrderPage');
    this.orderEntityProvider.retrieveAllSaleTransactions(this.customerEntity.businessId).subscribe(
      response => {
        this.saleTransactionEntities = response.saleTransactionEntities;
        for (let saleTransactionEntity of this.saleTransactionEntities) {
          this.stliEntities = saleTransactionEntity.saleTransactionLineItemEntities;
          for (let stli of this.stliEntities) {
            this.selectedSaleTransactionLineItem = stli;
            // this.selectedMenuItem = stli.menuItemEntity;
            // this.selectedVendor = stli.menuItemEntity.vendorEntity;
            // this.selectedFoodCourt = stli.menuItemEntity.vendorEntity.foodCourtEntity;
          }
        }
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    );
  }

  openModal(event, saleTransactionEntity){
    let myModal = this.modal.create(ModalOrderPage, {saleTransactionEntity: saleTransactionEntity});
    myModal.present();
  }

}