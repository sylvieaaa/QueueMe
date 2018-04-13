import { Component, trigger } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoodcourtEntityProvider } from '../../providers/foodcourt-entity/foodcourt-entity';
import { FoodcourtPage } from '../foodcourt/foodcourt';

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
  name: string;
  errorMessage: string;
  notChosen: boolean;
  queryText: string;
  fcourt:any;

  constructor(public navCtrl: NavController, public foodCourtEntityProvider: FoodcourtEntityProvider, public navParams: NavParams) {
    this.notChosen = true;
    this.name="";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    console.log(sessionStorage.getItem("notChosen"));

    if (sessionStorage.getItem("notChosen") === 'false') {
      this.notChosen= false;
      this.foodCourt = sessionStorage.getItem("foodCourt");
      this.name = sessionStorage.getItem('name');
      console.log("this is : " + sessionStorage.getItem('name'));
    }
    
    this.generateFoodCourt();

  }

  generateFoodCourt(){
    this.foodCourtEntityProvider.doFoodCourt().subscribe(
      response => {
        this.foodCourts = response.foodCourts;
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )
  }

  clear(){
    this.notChosen=true;
    this.name ="";
    sessionStorage.setItem("foodCourt", null);
    sessionStorage.setItem("name", " ");
    sessionStorage.setItem("notChosen","true");
  }

  clickOption(fcourt) {
    this.notChosen = false;
    this.foodCourt = fcourt;
    this.name = fcourt.name;
    sessionStorage.setItem("foodCourt", JSON.stringify(this.foodCourt));
    sessionStorage.setItem("name", fcourt.name);
    sessionStorage.setItem("notChosen","false");
  }

  getFoodCourt(ev: any){
    
    this.generateFoodCourt();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.foodCourts = this.foodCourts.filter((foodCourt) => {
        return (foodCourt.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  navFoodCourt(){
   this.navCtrl.push(FoodcourtPage); 
  }


}
