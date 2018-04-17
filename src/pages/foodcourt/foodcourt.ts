import { myIPAddress } from './../../ipAddress';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {VendorEntityProvider} from '../../providers/vendor-entity/vendor-entity';
import { VendorPage } from '../vendor/vendor';
/**
 * Generated class for the FoodcourtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-foodcourt',
  templateUrl: 'foodcourt.html',
})
export class FoodcourtPage {
  myIPAddress: string = new myIPAddress().ipaddress;
  vendors: any ;
  foodCourt: any;
  errorMessage: string;
  selectVendor: any;
  rate: any;

  constructor(public navCtrl: NavController, public vendorEntityProvider: VendorEntityProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodcourtPage');
    this.foodCourt = sessionStorage.getItem("foodCourt");
    this.retrieveVendors();
    
  }

  retrieveVendors(){
    this.vendorEntityProvider.doVendors(this.foodCourt).subscribe(
      response => {
        this.vendors = response.vendorEntities;
        console.log(this.vendors);
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )
  }

  navVendor(event, selected){
    this.selectVendor = selected;
    sessionStorage.setItem("selectVendor", JSON.stringify(this.selectVendor));
    this.navCtrl.push(VendorPage);
  }



}
