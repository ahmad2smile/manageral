import { ElementRef, Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";

import { ISetValWatch } from "../interfaces/index";

import { valMsgs } from "./validationMsgs";

@Injectable()
export class ValidationService{
	constructor(){
	}

	private validationMessageToReturn: string = "";
	private allValidationMessages: { [key: string]: { [key: string]: string}} = valMsgs;

	private validationMessage(inputEleName: string, inputEle: AbstractControl): string{
		if ((inputEle.touched || inputEle.dirty) && inputEle.errors) {
		    let msgArray = Object.keys(inputEle.errors)
							.map((errType: string)=> this.allValidationMessages[inputEleName][errType]);
			return Array.from(new Set(msgArray)).join(" "); // to remove duplicates from array
		}
		return "";
	}

	private delayValidationFor(inputEleName: string,
								rootFormGroup: FormGroup,
								delayValidationFor: number): Observable<any>{
		let inputEle = rootFormGroup.get(inputEleName);
		let propObservable$ =  inputEle.valueChanges.debounceTime(delayValidationFor);
		propObservable$.subscribe(
							(x)=>{
								this.validationMessageToReturn = this.validationMessage(inputEleName, inputEle);
							}
						);
		return propObservable$;
	}

	setValidationWatchFor(rootFormGroup: FormGroup): Array<ISetValWatch>{
		return Object.keys(rootFormGroup.controls)
			.map((controlName: string)=>{
				let elementObs = this.delayValidationFor(controlName, rootFormGroup, 500);
				return { controlName, elementObs };
			});
	}

	validateFormOnSubmit(rootFormGroup: FormGroup){
		Object.keys(rootFormGroup.controls).map((controlName: string) => {
			let formControl: AbstractControl = rootFormGroup.get(controlName);
  			formControl.markAsTouched();
			if (formControl.invalid){
				//to trigger changeValue event => change from null/undefined to ""
			    formControl.setValue("");
			}
		});
	}

	getValidationMessage(): string{
		return this.validationMessageToReturn;
	}
}
