import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { MainPage } from '../pages/main/main';
import { ProfilePage} from '../pages/profile/profile';
import { FoodcourtPage} from '../pages/foodcourt/foodcourt';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CustomerEntityProvider } from '../providers/customer-entity/customer-entity';
import { FoodcourtEntityProvider } from '../providers/foodcourt-entity/foodcourt-entity';
import { VendorEntityProvider } from '../providers/vendor-entity/vendor-entity';
import { MenuitemEntityProvider } from '../providers/menuitem-entity/menuitem-entity';

import {RatingModule} from 'primeng/rating';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ForgetPasswordPage,
    CreateAccountPage,
    MainPage,
    ProfilePage,
    FoodcourtPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ForgetPasswordPage,
    CreateAccountPage,
    MainPage,
    ProfilePage,
    FoodcourtPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomerEntityProvider,
    FoodcourtEntityProvider,
    VendorEntityProvider,
    MenuitemEntityProvider
  ]
})
export class AppModule {}
