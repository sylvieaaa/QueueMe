import { FCM } from '@ionic-native/fcm';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
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

import { CreditcardPage } from '../pages/creditcard/creditcard';
import { AddcardPage } from '../pages/addcard/addcard'


import { VendorPage } from '../pages/vendor/vendor';
import { ModalPage } from '../pages/modal/modal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('myNav') navCtrl: NavController

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    // this.fcm.getToken()
    //   .then(token => {
    //     console.log(`The token is ${token}`);
    //   })
    //   .catch(error => console.error('Error getting token', error));

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

    // platform.ready().then(() => {
    //   fcm.onNotification().subscribe(data => {
    //     if (data.wasTapped) {
    //       console.log(JSON.stringify(data));
    //       this.navCtrl.setRoot(ProfilePage);
    //     } else {
    //       console.log(JSON.stringify(data));
    //       this.navCtrl.push(CreditcardPage);
    //     }
    //   })
    // })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
