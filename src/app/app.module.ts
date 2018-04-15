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
import { CreditcardPage } from '../pages/creditcard/creditcard';
import { AddcardPage } from '../pages/addcard/addcard';
import { VendorPage } from '../pages/vendor/vendor';
import { ModalPage } from '../pages/modal/modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CustomerEntityProvider } from '../providers/customer-entity/customer-entity';
import { FoodcourtEntityProvider } from '../providers/foodcourt-entity/foodcourt-entity';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { VendorEntityProvider } from '../providers/vendor-entity/vendor-entity';
import { MenuitemEntityProvider } from '../providers/menuitem-entity/menuitem-entity';
import { CreditcardEntityProvider } from '../providers/creditcard-entity/creditcard-entity';

import {RatingModule} from 'primeng/rating';
import {SpinnerModule} from 'primeng/spinner';
import {AccordionModule} from 'primeng/accordion';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ForgetPasswordPage,
    CreateAccountPage,
    MainPage,
    ProfilePage,
    ChangePasswordPage,
    FoodcourtPage,
    CreditcardPage,
    AddcardPage,
    VendorPage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    RatingModule,
    AccordionModule,
    SpinnerModule,
    InputTextareaModule
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
    ChangePasswordPage,
    FoodcourtPage,
    CreditcardPage,
    AddcardPage,
    VendorPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomerEntityProvider,
    FoodcourtEntityProvider,
    VendorEntityProvider,
    MenuitemEntityProvider,
    CreditcardEntityProvider
  ]
})
export class AppModule {}
