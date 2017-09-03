import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";

import 'rxjs/add/observable/fromPromise';
import "rxjs/add/operator/delay";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/retryWhen";
import 'rxjs/add/observable/throw';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/take';

@Injectable()
export class DataService {
	constructor(private _http: Http) {
	}

	private baseUrl: string = "http://localhost:3000";
	
	private retryCalls(tries: number = 1){
		return (errors) => errors
				.mergeMap((error) => (error.status === 404) ? Observable.throw(error) : Observable.of(error))
				.delay(1000)
				.take(tries)
	}
	
	getAllGroups(): Observable<any>{
		return this._http.get(`${ this.baseUrl }/groups`)
					.map((res)=> res.json())
					.retryWhen(this.retryCalls(3));
	}
	
	createNewGroup(formData): Observable<any>{
		return this._http.post(`${ this.baseUrl }/groups`, formData)
					.map((res)=> res.json())
					.retryWhen(this.retryCalls(3));
	}
	
	deleteGroup(groupId: number): Observable<any>{
		return this._http.delete(`${ this.baseUrl }/groups/${ groupId }`)
					.map((res)=> res.json())
					.retryWhen(this.retryCalls(3));
	}
	
	getGroupDetails(groupId: number): Observable<any>{
		return this._http.get(`${ this.baseUrl }/groups/${ groupId }`)
					.map((res)=> res.json())
					.retryWhen(this.retryCalls(3));
	}
	
	
	getAllUsers(): Observable<any>{
		return this._http.get(`${ this.baseUrl }/users`)
					.map((res)=> res.json())
					.retryWhen(this.retryCalls(3));
	}
	
	createNewUser(formData): Observable<any>{
		return this._http.post(`${ this.baseUrl }/users`, formData)
					.map((res)=> res.json())
					.retryWhen(this.retryCalls(3));
	}
	
	deleteUser(userId: number): Observable<any>{
		return this._http.delete(`${ this.baseUrl }/users/${ userId }`)
					.map((res)=> res.json())
					.retryWhen(this.retryCalls(3));
	}
	
	getUserDetails(userId: number): Observable<any>{
		return this._http.get(`${ this.baseUrl }/users/${ userId }`)
					.map((res)=> res.json())
					.retryWhen(this.retryCalls(3));
	}
	
	updateUser(userId, newData){
		return this._http.put(`${ this.baseUrl }/users/${ userId }`, newData)
					.map((res)=> res.json())
					.retryWhen(this.retryCalls(3));
	}
}
