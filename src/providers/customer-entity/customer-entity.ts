import { myIPAddress } from './../../ipAddress';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { CustomerEntity } from '../../entities/CustomerEntity';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerEntityProvider {

	ipAddress = new myIPAddress().ipaddress;
	portNo = '8080';
	fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/QueueMeSystemJsf/Resources/Customer';
	baseUrl = "/api/Customer";

	constructor(public httpClient: HttpClient, public platform: Platform) {
		console.log('Hello CustomerEntityProvider Provider');
	}

	doCustomerLogin(username: string, password: string): Observable<any> {
		let path: string = '';

		if (this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}
		console.log(path);

		return this.httpClient.get<any>(path + "/login?username=" + username + "&password=" + password).pipe
			(
			catchError(this.handleError)
			);
	}

	doResetPassword(username: string): Observable<any> {
		let path: string = '';

		if (this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}

		return this.httpClient.get<any>(path + "/resetPassword?username=" + username).pipe
			(
			catchError(this.handleError)
			);
	}

	createAccount(customerEntity: CustomerEntity): Observable<any> {

		let createCustomerReq = { "customerEntity": customerEntity };
		let path: string = '';

		if (this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}


		return this.httpClient.put<any>(path, createCustomerReq, httpOptions).pipe
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

	updateCustomer(customerEntity: CustomerEntity): Observable<any> {
		let updateCustomerReq = { "customerEntity": customerEntity };
		let path: string = '';

		if (this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}

		return this.httpClient.post<any>(path +  "/updateCustomer", updateCustomerReq, httpOptions).pipe
			(
			catchError(this.handleError)
			);
	}

	updateCustomerPassword(customerEntity: CustomerEntity, oldPassword: String, newPassword: String): Observable<any> {
		let changePasswordReq = { "customerEntity" : customerEntity, "oldPassword" : oldPassword, "newPassword": newPassword };
		let path: string = '';

		if (this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}

		return this.httpClient.post<any>(path + "/changePassword", changePasswordReq, httpOptions).pipe
			(
			catchError(this.handleError)
			);
	}

	updateToken(customerEntity: CustomerEntity) {
		let updateCustomerReq = {"customerEntity" : customerEntity};
		let path: string = '';

		if (this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}

		return this.httpClient.post<any>(path +  "/updateToken", updateCustomerReq, httpOptions).pipe
			(
			catchError(this.handleError)
			);
	}
}