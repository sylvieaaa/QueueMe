import { myIPAddress } from './../../ipAddress';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { ReviewEntity } from '../../entities/ReviewEntity';
import { CustomerEntity } from '../../entities/CustomerEntity';
/*
  Generated class for the ReviewEntityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReviewEntityProvider {

  ipAddress = new myIPAddress().ipaddress;
  portNo = '8080';
  fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/QueueMeSystemJsf/Resources/Review';
  baseUrl = "/api/Review";

  constructor(public httpClient: HttpClient, public platform: Platform) {
    console.log('Hello ReviewEntityProvider Provider');
  }

  updateReview(vendorEntity: any, reviewEntity: ReviewEntity, customerEntity: CustomerEntity): Observable<any>{
    let path: string = '';
    console.log(vendorEntity);
    console.log(reviewEntity);
    console.log(customerEntity);
    let reviewReq: any = {"vendorEntity" : vendorEntity, "reviewEntity" : reviewEntity, "customerEntity" : customerEntity};
    console.log(reviewReq);
    // console.log(foodCourtId);

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }
    
    return this.httpClient.put<any>(path , reviewReq, httpOptions).pipe
      (
      catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An unknown error has occurred:', error.error.message);
    }
    else {
      console.error(" A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`);
    }

    return new ErrorObservable(error);
  }
  
}
