import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {VendorEntityProvider} from '../../providers/vendor-entity/vendor-entity';

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

  vendors: any ;
  foodCourt: any;
  errorMessage: string;


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
      
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )
  }

}
