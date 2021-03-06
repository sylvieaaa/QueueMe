import { ShoppingCartPage } from './../pages/shopping-cart/shopping-cart';
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
import { ShowOrderPage } from '../pages/show-order/show-order';
import { ModalVendorReviewPage} from '../pages/modal-vendor-review/modal-vendor-review';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CustomerEntityProvider } from '../providers/customer-entity/customer-entity';
import { FoodcourtEntityProvider } from '../providers/foodcourt-entity/foodcourt-entity';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { VendorEntityProvider } from '../providers/vendor-entity/vendor-entity';
import { MenuitemEntityProvider } from '../providers/menuitem-entity/menuitem-entity';
import { CreditcardEntityProvider } from '../providers/creditcard-entity/creditcard-entity';

import {InputMaskModule} from 'primeng/inputmask';
import {RatingModule} from 'primeng/rating';
import {SpinnerModule} from 'primeng/spinner';
import {AccordionModule} from 'primeng/accordion';
import { CheckoutProvider } from '../providers/checkout/checkout';
// import { Push } from '@ionic-native/push';
import { FCM } from '@ionic-native/fcm';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ViewOrderPage } from '../pages/view-order/view-order';
import { OrderEntityProvider } from '../providers/order-entity/order-entity';
import { Vibration } from '@ionic-native/vibration';
import { ReviewEntityProvider } from '../providers/review-entity/review-entity';


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
    ModalPage,
    ViewOrderPage,
    ShoppingCartPage,
    ViewOrderPage,
    ShowOrderPage,
    ModalVendorReviewPage

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    RatingModule,
    AccordionModule,
    SpinnerModule,
    InputTextareaModule,
    InputMaskModule
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
    ModalPage,
    ViewOrderPage,
    ShoppingCartPage,
    ViewOrderPage,
    ShowOrderPage,
    ModalVendorReviewPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomerEntityProvider,
    FoodcourtEntityProvider,
    VendorEntityProvider,
    MenuitemEntityProvider,
    CreditcardEntityProvider,
    CheckoutProvider,
    FCM,
    OrderEntityProvider,
    Vibration,
    ReviewEntityProvider
  ]
})
export class AppModule {}
