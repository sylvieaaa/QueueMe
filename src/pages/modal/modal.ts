import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  data:any;
  quantity: number;
  specialRequest: string;

  constructor(public navParams: NavParams, public view: ViewController, private toastCtrl: ToastController) {
    this.data= this.navParams.get('data');
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  
  }

  closeModal(){
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    toast.setMessage("Added to cart successfully!");
    toast.present();
    this.view.dismiss();
  }

}
