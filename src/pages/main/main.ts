import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoodcourtEntityProvider } from '../../providers/foodcourt-entity/foodcourt-entity';

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
  foodCourts: any;
  foodCourt: any;
  errorMessage: string;
  notChosen: boolean;

  constructor(public navCtrl: NavController, public foodCourtEntityProvider: FoodcourtEntityProvider, public navParams: NavParams) {
    this.notChosen = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    console.log(sessionStorage.getItem("notChosen"));

    if (sessionStorage.getItem("notChosen") === 'false') {
      this.foodCourt = sessionStorage.getItem("foodCourt");
    }
    
      this.foodCourtEntityProvider.doFoodCourt().subscribe(
        response => {
          this.foodCourts = response.foodCourts;
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      )
    

  }

  clickOption(fcourt) {
    this.notChosen = false;
    this.foodCourt = fcourt;
    sessionStorage.setItem("foodCourt", JSON.stringify(this.foodCourt));
    sessionStorage.setItem("notChosen", "false");
  }


}
