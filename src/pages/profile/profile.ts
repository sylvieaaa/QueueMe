import { Component } from '@angular/core';
import { NavController, NavParams, Toast } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity'
import { CustomerEntityProvider } from '../../providers/customer-entity/customer-entity';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  customerEntity: CustomerEntity;
  username: string ;
  errorMessage: string ;
  infoMessage: string;
  firstName: string;
  lastName: string;
  contactNumber: string ;
  address: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public customerEntityProvider: CustomerEntityProvider,
    private toastCtrl: ToastController) {
    this.customerEntity = new CustomerEntity();
    this.username= this.customerEntity.username;
    this.firstName= this.customerEntity.firstName;
    this.lastName= this.customerEntity.lastName;
    this.address = this.customerEntity.address;
    this.contactNumber = this.customerEntity.contactNumber;

  }

  ionViewDidLoad() {
    this.customerEntity = JSON.parse(localStorage.getItem('customerEntity'));
    console.log(JSON.parse(localStorage.getItem('customerEntity')));
  }

  editCustomer() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    //  if (this.firstName == null || this.lastName == null || this.address == null || this.contactNumber == null)
    //  //  if (this.firstName == "" || this.lastName == "" || this.address == "" || this.contactNumber == "") 
    //   {
    //     console.log(JSON.parse(sessionStorage.getItem('customerEntity')));
    //     toast.setMessage("Please fill in ");
    //   toast.present();
    // } else {

    if (this.firstName === "" || this.lastName === "" || this.address === "" || this.contactNumber === "") {
      toast.setMessage("Please fill in the missing fields!");
      toast.present();
      return;
    }

    else {
      this.customerEntityProvider.updateCustomer(this.customerEntity).subscribe(
        response => {

          localStorage.setItem("customerEntity", JSON.stringify(this.customerEntity));
          console.log(JSON.stringify(this.customerEntity));
          toast.setMessage("Profile Updated!");
          toast.present();
        },
        error => {
          this.infoMessage = null;
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
  }
}
//}
