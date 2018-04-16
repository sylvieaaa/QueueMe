import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity';

/*
  Generated class for the OrderEntityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderEntityProvider {

  ipAddress = '192.168.1.98';
  portNo = '8080';
  fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/QueueMeSystem/Resources/Order';
  baseUrl = "/api/Order";

  constructor(public httpClient: HttpClient, public platform: Platform) {
    console.log('Hello OrderEntityProvider Provider');
  }

  retrieveAllOrders(customerId: number): Observable<any> 
	{	
    let path: string = '';
    
		
		if(this.platform.is('core') || this.platform.is('mobileweb')) 
		{
			path = this.baseUrl;
		}
		else
		{
			path = this.fullBaseUrl;
		}
	
		return this.httpClient.get<any>(path + "/retrieveAllOrders?customerId="+ customerId).pipe
		(
			catchError(this.handleError)
		);		
  }

  private handleError(error: HttpErrorResponse)
	{
		if (error.error instanceof ErrorEvent) 
		{		
			console.error('An unknown error has occurred:', error.error.message);
		} 
		else 
		{		
			console.error(" A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`);
		}
		
		return new ErrorObservable(error);
  }

}
