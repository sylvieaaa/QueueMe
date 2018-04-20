import { ShoppingCartPage } from './../shopping-cart/shopping-cart';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { MenuitemEntityProvider } from '../../providers/menuitem-entity/menuitem-entity';
import { ModalPage } from '../modal/modal';
import { myIPAddress } from './../../ipAddress';

/**
 * Generated class for the VendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html',
})
export class VendorPage {
  myIPAddress: string = new myIPAddress().ipaddress;
  vendor: any;
  menu: any;
  errorMessage: string;
  categories: any;
  menuItems:any;
  selectCategory:any;

  constructor(public modal: ModalController, public navCtrl: NavController, public menuitemEntityProvider: MenuitemEntityProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorPage');
    this.vendor = sessionStorage.getItem("selectVendor");
    this.retrieveVendor();

  }

  retrieveVendor(){
    this.menuitemEntityProvider.retrieveMenu(this.vendor).subscribe(
      response => {
        this.menu = response.menuEntity;
        this.categories = this.menu.categoryEntities;
        for (let category of this.categories){
          this.selectCategory = category;
          this.menuItems = category.menuItemEntities;
        }
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )
  }

  openModal(event, menuItem){
    let myModal = this.modal.create(ModalPage, {data: menuItem});
    myModal.present();


  }
  
  openShoppingCart() {
    this.navCtrl.push(ShoppingCartPage);
  }





}
