import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity';
import { ToastController } from 'ionic-angular';
import { OrderEntityProvider } from '../../providers/order-entity/order-entity'

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

  customerEntity: CustomerEntity;
  orders: any;
  errorMessage: String;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,  private toastCtrl: ToastController,
    public orderEntityProvider: OrderEntityProvider) {
      this.customerEntity = JSON.parse(sessionStorage.getItem('customerEntity'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrderPage');
    this.orderEntityProvider.retrieveAllOrders(this.customerEntity.businessId).subscribe(
      response => {
        this.orders = response.orderEntities;
        console.log(response.orderEntities);
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    );
  }

}