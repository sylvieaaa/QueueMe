import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
/*
  Generated class for the FoodcourtEntityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FoodcourtEntityProvider {

  ipAddress = '172.17.169.193';
  portNo = '8080';
  fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/QueueMeSystemJsf/Resources/FoodCourt';
  baseUrl = "/api/FoodCourt";

  constructor(public httpClient: HttpClient, public platform: Platform) {
    console.log('Hello CustomerEntityProvider Provider');
  }

  doFoodCourt(): Observable<any> {
    let path: string = '';
    
    if(this.platform.is('core') || this.platform.is('mobileweb')) 
		{
			path = this.baseUrl;
		}
		else
		{
			path = this.fullBaseUrl;
		}

    return this.httpClient.get<any>(path + "/retrieveAll").pipe
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
