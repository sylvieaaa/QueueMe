import { myIPAddress } from './../../ipAddress';
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
	ipAddress = new myIPAddress().ipaddress;
  portNo = new myIPAddress().portNo;
  // portNo = '8080';
  fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/QueueMeSystemJsf/Resources/Order';
  baseUrl = "/api/Order";

  constructor(public httpClient: HttpClient, public platform: Platform) {
    console.log('Hello OrderEntityProvider Provider');
  }

  retrieveAllSaleTransactions(customerId: number): Observable<any> 
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
		console.log("return");
		return this.httpClient.get<any>(path + "/retrieveAllSaleTransactions?customerId="+ customerId).pipe
		(
			catchError(this.handleError)
		);		
	}
	
	retrieveAllOrders(saleTransactionId: number, customerId:number): Observable<any> 
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
		console.log("Client has been returned");
		return this.httpClient.get<any>(path + "/retrieveAllOrders?saleTransactionId="+ saleTransactionId + "&customerId=" + customerId).pipe
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
