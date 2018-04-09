import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerEntityProvider {

  ipAddress = '172.17.168.75';
	portNo = '8080';
	fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/QueueMeSystem/Resources/Customer';
	baseUrl = "/api/Customer";

  constructor(public httpClient: HttpClient, public platform: Platform) {
    console.log('Hello CustomerEntityProvider Provider');
  }

  doCustomerLogin(username:string, password:string): Observable<any> {
    let path: string = '';
    
    if(this.platform.is('core') || this.platform.is('mobileweb')) 
		{
			path = this.baseUrl;
		}
		else
		{
			path = this.fullBaseUrl;
		}
	
		return this.httpClient.get<any>(path + "/login?username=" + username + "&password=" + password).pipe
		(
			catchError(this.handleError)
		);
	}
	
	doResetPassword(username:string): Observable<any> {
    let path: string = '';
    
    if(this.platform.is('core') || this.platform.is('mobileweb')) 
		{
			path = this.baseUrl;
		}
		else
		{
			path = this.fullBaseUrl;
		}
	
		return this.httpClient.get<any>(path + "/resetPassword?username=" + username).pipe
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