import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { ReviewEntity } from './../../entities/ReviewEntity';
import { ReviewEntityProvider } from '../../providers/review-entity/review-entity';
import { CustomerEntity } from './../../entities/CustomerEntity';
/**
 * Generated class for the ModalVendorReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-vendor-review',
  templateUrl: 'modal-vendor-review.html',
})
export class ModalVendorReviewPage {

  vendor: any;
  rating: number;
  description: string;
  customerEntity: CustomerEntity;
  errorMessage: string;

  constructor(public navCtrl: NavController, public reviewEntityProvider: ReviewEntityProvider, public navParams: NavParams, public view: ViewController, private toastCtrl: ToastController) {
    this.vendor = this.navParams.get('vendor');
    this.rating = 0;
    this.description = "";
    this.customerEntity = JSON.parse(localStorage.getItem('customerEntity'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalVendorReviewPage');

    console.log(this.vendor);


  }

  returnBack() {
    this.view.dismiss();
  }

  submitReview() {

    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

    if (this.rating === 0 && this.description === "") {
      toast.setMessage("Please enter your feedback! :(");
      toast.present();
      return;

    }

    else {
      let review = new ReviewEntity();
      review.description = this.description;
      review.rating = this.rating;
      this.reviewEntityProvider.updateReview(this.vendor, review, this.customerEntity).subscribe(
        response => {
          console.log(response);

          let toast = this.toastCtrl.create({
            duration: 3000,
            position: 'bottom'
          });
          toast.setMessage("Thank you for your review!");
          toast.present();
          this.navCtrl.pop();
        },
        error => {
          console.log(error);
        }
      )
      // this.reviewEntityProvider.updateReview(this.vendor, review, this.customerEntity).subscribe(
      //   response=>{
      //     console.log("end");
      //   }
      //   ,error => {
      //     this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      //   }

      // );
    }
  }

}
