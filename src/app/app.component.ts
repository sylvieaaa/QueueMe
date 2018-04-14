import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MainPage } from '../pages/main/main';
import { ProfilePage} from '../pages/profile/profile';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { FoodcourtPage } from '../pages/foodcourt/foodcourt';

import { CreditcardPage } from '../pages/creditcard/creditcard';
import { AddcardPage } from '../pages/addcard/addcard'


import { VendorPage } from '../pages/vendor/vendor';
import { ModalPage } from '../pages/modal/modal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    if (sessionStorage.getItem('customerEntity') != null) {
      this.rootPage = MainPage;
    }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: MainPage },
      { title: 'Profile', component: ProfilePage},
      { title: 'Change Password', component: ChangePasswordPage },
      { title: 'Saved Credit Card', component: CreditcardPage },
      { title: 'List', component: ListPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    if(sessionStorage.getItem('customerEntity') != null) {
      sessionStorage.removeItem('customerEntity');
      this.nav.setRoot(HomePage);
    }
  }
}
