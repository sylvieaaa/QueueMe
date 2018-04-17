import { CreateAccountPage } from './../pages/create-account/create-account';
import { CustomerEntityProvider } from './../providers/customer-entity/customer-entity';
import { CreditcardPage } from './../pages/creditcard/creditcard';
import { Vibration } from '@ionic-native/vibration';
import { FCM } from '@ionic-native/fcm';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, AlertController } from 'ionic-angular';
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

import { AddcardPage } from '../pages/addcard/addcard';


import { VendorPage } from '../pages/vendor/vendor';
import { ModalPage } from '../pages/modal/modal';
import { ModalOrderPage } from '../pages/modal-order/modal-order';
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
    public vibration: Vibration, private alertCtrl: AlertController, public customerEntityProvider: CustomerEntityProvider) {
    this.initializeApp();
<<<<<<< HEAD
    // this.fcm.getToken()
    //   .then(token => {
    //     this.pushToken = token;
    //     sessionStorage.setItem("pushToken", this.pushToken);
    //     console.log(`The token is ${token}`);
    //   })
    //   .catch(error => console.error('Error getting token', error));
=======
    
>>>>>>> f7e8d92bbe887d6ec69f10c7b517e2a30ed3fa5a

    if (sessionStorage.getItem('customerEntity') != null) {
      this.rootPage = MainPage;
    }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: MainPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Change Password', component: ChangePasswordPage },
      { title: 'Payment', component: CreditcardPage },
      { title: "Orders", component: ViewOrderPage },
      { title: 'List', component: ListPage },
    ];

<<<<<<< HEAD
    platform.ready().then(() => {
      // fcm.onTokenRefresh().subscribe(token => {
      //   if(sessionStorage.getItem('customerEntity') != null) {
      //   let customerEntity:CustomerEntity = JSON.parse(sessionStorage.getItem('customerEntity'));
      //     customerEntity.pushToken = token;
      //     this.customerEntityProvider.updateToken(customerEntity).subscribe(
      //       response => {
      //         sessionStorage.setItem('customerEntity', JSON.stringify(customerEntity));
      //       }, error => {
      //         console.log("something went wrong");
      //       }
      //     )
      //   }
      // })
      // fcm.onNotification().subscribe(data => {
      //   if (data.wasTapped) {
      //     console.log(JSON.stringify(data));
      //     //  this.navCtrl.setRoot(ProfilePage);
      //     // window.location.href = "/pages/profile/profile.html";
      //     //this.rootPage = ProfilePage;
      //   } else {
      //     console.log(JSON.stringify(data));
      //     let receiveMessage = JSON.stringify(data);
      //     this.vibration.vibrate([2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000]);
      //     let alert = this.alertCtrl.create({
      //       title: "Your food is ready!",
      //       message: data.data,
      //       buttons:
      //         [
      //           {
      //             text: 'OK',
      //             role: 'OK',
      //             handler: () => {
      //               this.vibration.vibrate(0);
      //               console.log('Cancel clicked');
      //               alert.dismiss().then(() => { this.navCtrl.push(CreditcardPage);})
                    
      //             }
      //           }
      //         ]
      //     })
      //     alert.present();
      //     // this.navCtrl.push(CreditcardPage);
      //     // this.vibration.vibrate(0);
      //   }
      // })
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
=======
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.getToken()
      .then(token => {
        this.pushToken = token;
        sessionStorage.setItem("pushToken", this.pushToken);
        console.log(`The token is ${token}`);
      })
      .catch(error => console.error('Error getting token', error));
      this.fcm.onTokenRefresh().subscribe(token => {
        if(sessionStorage.getItem('customerEntity') != null) {
        let customerEntity:CustomerEntity = JSON.parse(sessionStorage.getItem('customerEntity'));
          customerEntity.pushToken = token;
          this.customerEntityProvider.updateToken(customerEntity).subscribe(
            response => {
              sessionStorage.setItem('customerEntity', JSON.stringify(customerEntity));
            }, error => {
              console.log("something went wrong");
            }
          )
        }
      })
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log(JSON.stringify(data));
          this.rootPage = CreditcardPage;
           this.nav.setRoot(CreateAccountPage);
          // window.location.href = "/pages/profile/profile.html";
          //this.rootPage = ProfilePage;
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
                    alert.dismiss().then(() => { this.navCtrl.push(CreateAccountPage);})
                    
                  }
                }
              ]
          })
          alert.present();
          // this.navCtrl.push(CreditcardPage);
          // this.vibration.vibrate(0);
        }
      })
>>>>>>> f7e8d92bbe887d6ec69f10c7b517e2a30ed3fa5a
      // this.pushSetUp();
    });
  }

  //   pushSetUp() {
  //     const options: PushOptions = {
  //       android: {
  //         senderID: '735404994916'
  //       }
  //     };
  //     const pushObject: PushObject = this.push.init(options);

  //     pushObject.on('notification').subscribe((notification: any) => {
  //       if (notification.additionalData.foreground) {
  //         alert(notification.message);
  //       }
  //     });

  //     pushObject.on('registration').subscribe((registration: any) => {
  //       //do whatever you want with the registration ID
  //     });

  //     pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));


  // }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    if (sessionStorage.getItem('customerEntity') != null) {
      sessionStorage.removeItem('customerEntity');
      this.nav.setRoot(HomePage);
    }
  }
}
