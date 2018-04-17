import { myIPAddress } from './../../ipAddress';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

/*
  Generated class for the VendorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VendorEntityProvider {
  ipAddress = new myIPAddress().ipaddress;
  portNo = '8080';
  fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/QueueMeSystemJsf/Resources/Vendor';
  baseUrl = "/api/Vendor";

  constructor(public httpClient: HttpClient, public platform: Platform) {
    console.log('Hello VendorProvider Provider');
  }

  doVendors(foodCourt: any): Observable<any> {

    let getVendorReq = { "foodCourtEntity": foodCourt };
    let path: string = '';
    let foodCourtId = (JSON.parse(foodCourt)).businessId;

    // console.log(foodCourtId);

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }
    
    return this.httpClient.get<any>(path + "/retrieveVendors?foodCourtId=" + foodCourtId).pipe
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
