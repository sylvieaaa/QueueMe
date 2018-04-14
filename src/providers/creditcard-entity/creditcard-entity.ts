import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity';

//import { CreditCardEntity } from '../../entities/CreditCardEntity';

/*
  Generated class for the CreditcardEntityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CreditcardEntityProvider {

  ipAddress = '192.168.1.98';
  portNo = '8080';
  fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/QueueMeSystem/Resources/CreditCard';
  baseUrl = "/api/CreditCard";

  constructor(public httpClient: HttpClient, public platform: Platform) {
    console.log('Hello CreditcardEntityProvider Provider');
  }

  retrieveAllCreditCards(customerId: number): Observable<any> 
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
	
		return this.httpClient.get<any>(path + "/retrieveCreditCards?customerId="+ customerId).pipe
		(
			catchError(this.handleError)
		);		
  }
  
  createCard(cardNum: String, cardName: String, customerEntity: CustomerEntity): Observable<any>
	{
		let createCardReq = {"cardNum": cardNum, "cardName": cardName, "customerEntity" : customerEntity};
		let path: string = '';
		
		if(this.platform.is('core') || this.platform.is('mobileweb')) 
		{
			path = this.baseUrl;
		}
		else
		{
			path = this.fullBaseUrl;
		}				
		
		return this.httpClient.put<any>(path + "/createCard", createCardReq, httpOptions).pipe
		(
			catchError(this.handleError)
		);
	}

	selectedCreditCard(customerEntity: CustomerEntity, creditCard: any): Observable<any> {
		let selectedCreditCardReq = { "customerEntity" : customerEntity, "creditCard" : creditCard};
		let path: string = '';

		if (this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}

		console.log(creditCard.creditCardId);
		return this.httpClient.get<any>(path + "/selectedCard?creditCardId=" + creditCard.creditCardId).pipe
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