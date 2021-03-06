import { SaleTransactionEntity } from './../entities/SaleTransactionEntity';
import { CreateAccountPage } from './../pages/create-account/create-account';
import { CustomerEntityProvider } from './../providers/customer-entity/customer-entity';
import { CreditcardPage } from './../pages/creditcard/creditcard';
import { Vibration } from '@ionic-native/vibration';
import { FCM } from '@ionic-native/fcm';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, AlertController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { FoodcourtPage } from '../pages/foodcourt/foodcourt';
import { ViewOrderPage } from '../pages/view-order/view-order';
import { ShowOrderPage } from '../pages/show-order/show-order';

import { ModalVendorReviewPage } from '../pages/modal-vendor-review/modal-vendor-review';
import { AddcardPage } from '../pages/addcard/addcard';


import { VendorPage } from '../pages/vendor/vendor';
import { ModalPage } from '../pages/modal/modal';
import { CustomerEntity } from '../entities/CustomerEntity';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('myNav') navCtrl: NavController

  rootPage: any = HomePage;
  pushToken: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public fcm: FCM,
    public vibration: Vibration, private alertCtrl: AlertController, public customerEntityProvider: CustomerEntityProvider, public modal: ModalController) {
    this.initializeApp();


    if (localStorage.getItem('customerEntity') != null) {
      this.rootPage = MainPage;
    }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: MainPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Change Password', component: ChangePasswordPage },
      { title: 'Payment', component: CreditcardPage },
      { title: "Orders", component: ViewOrderPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('android')) {
        this.fcm.getToken()
          .then(token => {
            this.pushToken = token;
            localStorage.setItem("pushToken", this.pushToken);
            console.log(`The token is ${token}`);
          })
          .catch(error => console.error('Error getting token', error));
        this.fcm.onTokenRefresh().subscribe(token => {
          if (localStorage.getItem('customerEntity') != null) {
            let customerEntity: CustomerEntity = JSON.parse(localStorage.getItem('customerEntity'));
            customerEntity.pushToken = token;
            this.customerEntityProvider.updateToken(customerEntity).subscribe(
              response => {
                localStorage.setItem('customerEntity', JSON.stringify(customerEntity));
              }, error => {
                console.log("something went wrong");
              }
            )
          }
        })
        this.fcm.onNotification().subscribe(data => {
          let saleTransaction: SaleTransactionEntity = JSON.parse(data.saleTransactionEntity);

          console.log(data.saleTransactionEntity);
          if (data.wasTapped) {
            console.log(JSON.stringify(data));
            sessionStorage.setItem("showOrderPage", JSON.stringify(saleTransaction));
            this.navCtrl.setRoot(ShowOrderPage);
          } else {
            console.log(JSON.stringify(data));
            let receiveMessage = JSON.stringify(data);
            this.vibration.vibrate([2000, 1000, 2000]);
            let alert = this.alertCtrl.create({
              title: "Your food is ready!",
              message: data.data,
              buttons:
                [
                  {
                    text: 'OK',
                    role: 'OK',
                    handler: () => {
                      this.vibration.vibrate(0);
                      console.log('Cancel clicked');
                      alert.dismiss().then(() => {
                        this.navCtrl.push(ShowOrderPage);
                        sessionStorage.setItem("showOrderPage", JSON.stringify(saleTransaction));
                        console.log(sessionStorage.getItem("showOrderPage"));
                      })

                    }
                  }
                ]
            })
            alert.present();
          }
        }, error => {
          alert(error);
        })
      }
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title === "Home") {
      this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }
  }

  logout() {
    if (localStorage.getItem('customerEntity') != null) {
      let customerEntity: CustomerEntity = JSON.parse(localStorage.getItem('customerEntity'));
      customerEntity.pushToken = null;
      this.customerEntityProvider.updateToken(customerEntity).subscribe(
        response => {
          localStorage.removeItem('customerEntity');
          sessionStorage.clear();
          this.nav.setRoot(HomePage);
        }, error => {
          localStorage.removeItem('customerEntity');
          sessionStorage.clear();
          this.nav.setRoot(HomePage);
        }
      )
    }
  }
}
