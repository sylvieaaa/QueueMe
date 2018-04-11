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

  customerEntity : CustomerEntity;
  username: string;
  errorMessage: string;
  infoMessage: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public customerEntityProvider: CustomerEntityProvider,
              private toastCtrl: ToastController) {
      this.customerEntity = new CustomerEntity();
              
  }

  ionViewDidLoad() {
    this.customerEntity = JSON.parse(sessionStorage.getItem('customerEntity'));
    console.log(JSON.parse(sessionStorage.getItem('customerEntity')));       
  }

  editCustomer()
	{
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
     if (this.firstName == null || this.lastName == null || this.address == null || this.contactNumber == null)
     //  if (this.firstName == "" || this.lastName == "" || this.address == "" || this.contactNumber == "") 
      {
      toast.setMessage("Please fill in ");
      toast.present();
    } else {
    this.customerEntityProvider.updateCustomer(this.customerEntity).subscribe(
			response => {	
        // this.customerEntity = response.customerEntity;
         sessionStorage.setItem("customerEntity", JSON.stringify(this.customerEntity));
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
