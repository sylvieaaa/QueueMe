import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity';
import { ToastController } from 'ionic-angular';
import { OrderEntityProvider } from '../../providers/order-entity/order-entity';
import { DatePipe } from '@angular/common';
import { myIPAddress } from './../../ipAddress';
import { ShowOrderPage } from '../show-order/show-order';

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
  haveItems: boolean;
  

  constructor(public modal: ModalController, public navCtrl: NavController, public navParams: NavParams,  private toastCtrl: ToastController,
    public orderEntityProvider: OrderEntityProvider, public loadingCtrl: LoadingController) {
      this.customerEntity = JSON.parse(localStorage.getItem('customerEntity'));
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: "Retriving your orders...",
      duration: 500
    })

    loading.present();
    console.log('ionViewDidLoad ViewOrderPage');
    this.orderEntityProvider.retrieveAllSaleTransactions(this.customerEntity.businessId).subscribe(
      response => {
        this.saleTransactionEntities = response.saleTransactionEntities;
        if (this.saleTransactionEntities.length > 0) {
          this.haveItems = true;
        } else {
          this.haveItems = false;
        }
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

  openOrderItem(event, saleTransactionEntity){
    this.navCtrl.push(ShowOrderPage, {saleTransactionEntity: saleTransactionEntity});
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: "Retrieving details...",
      dismissOnPageChange: true
    })
    loading.present();

  }

}