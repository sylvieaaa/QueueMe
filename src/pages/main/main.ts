import { CustomerEntityProvider } from './../../providers/customer-entity/customer-entity';
import { CustomerEntity } from './../../entities/CustomerEntity';
import { ShoppingCartPage } from './../shopping-cart/shopping-cart';
import { Component, trigger } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FoodcourtEntityProvider } from '../../providers/foodcourt-entity/foodcourt-entity';
import { FoodcourtPage } from '../foodcourt/foodcourt';
import { myIPAddress } from './../../ipAddress';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  myIPAddress: string = new myIPAddress().ipaddress + new myIPAddress().portNo;
  customerEntity: CustomerEntity;
  foodCourts: any;
  foodCourt: any;
  name: string;
  errorMessage: string;
  notChosen: boolean;
  queryText: string;
  fcourt: any;
  replicate: any;

  constructor(public navCtrl: NavController, public foodCourtEntityProvider: FoodcourtEntityProvider, public navParams: NavParams, 
    public customerEntityProvider: CustomerEntityProvider, public loadingCtrl: LoadingController) {
    this.customerEntity = JSON.parse(localStorage.getItem('customerEntity'));
    let pushToken = localStorage.getItem("pushToken");
    if (!(this.customerEntity.pushToken === pushToken)) {
      this.customerEntity.pushToken = pushToken;
      this.customerEntityProvider.updateToken(this.customerEntity).subscribe(
        response => {
          localStorage.setItem('customerEntity', JSON.stringify(this.customerEntity));
        }, error => {
          console.log("something went wrong");
        }
      )
    }
    // this.firebase.getToken()
    // .then(token => {
    //   console.log(`The token is ${token}`);
    //   this.customerEntity.token = token;
    //   sessionStorage.setItem('customerEntity', JSON.stringify(this.customerEntity));
    // })
    // .catch(error => console.error('Error getting token', error));
    this.notChosen = true;
    this.name = "";
    this.generateFoodCourt();
    
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    console.log(sessionStorage.getItem("notChosen"));

    if (sessionStorage.getItem("notChosen") === 'false') {
      this.notChosen = false;
      this.foodCourt = sessionStorage.getItem("foodCourt");
      this.name = sessionStorage.getItem('name');
      // console.log("this is : " + sessionStorage.getItem('name'));
    }

    this.generateFoodCourt();


  }

  generateFoodCourt() {
    this.foodCourtEntityProvider.doFoodCourt().subscribe(
      response => {
        this.foodCourts = response.foodCourts;
        this.replicate = response.foodCourts;
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )
  }

  clear() {
    this.notChosen = true;
    this.name = "";
    sessionStorage.setItem("foodCourt", null);
    sessionStorage.setItem("name", " ");
    sessionStorage.setItem("notChosen", "true");
  }

  clickOption(fcourt) {
    this.notChosen = false;
    this.foodCourt = fcourt;
    this.name = fcourt.name;
    sessionStorage.setItem("foodCourt", JSON.stringify(this.foodCourt));
    sessionStorage.setItem("name", fcourt.name);
    sessionStorage.setItem("notChosen", "false");
  }

  copyArray() {
    this.foodCourts = Array.from(this.replicate); //copy rep to foodcourts
  }

  getFoodCourt(ev: any) {

    //this.generateFoodCourt();
    this.copyArray();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.foodCourts = this.foodCourts.filter((foodcourt) => {
        return (foodcourt.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  navFoodCourt(event, fc) {
    this.foodCourt = fc;

    sessionStorage.setItem("foodCourt", JSON.stringify(this.foodCourt));
    this.navCtrl.push(FoodcourtPage);
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: "Retriving vendors...",
      dismissOnPageChange: true
    })
    loading.present();
   
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.foodCourts.push(this.foodCourts.length);
      }


      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  openShoppingCart() {
    this.navCtrl.push(ShoppingCartPage);
  }
}
