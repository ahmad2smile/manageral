import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { DataService, ValidationService } from "../../services/index";

import { ISetValWatch } from "../../interfaces/index";

@Component({
	selector: 'app-newgroup',
	templateUrl: './newgroup.component.html',
	styleUrls: ['./newgroup.component.sass']
})
export class NewgroupComponent implements OnInit, AfterViewInit{
	constructor(private _dataService: DataService,
				private _router: Router,
                private _validationService: ValidationService,
                private _formBuilder: FormBuilder){
	}
    
    private newgroupForm: FormGroup;
    private valMsgs: Object = {};

	ngOnInit(){
        this.newgroupForm = this._formBuilder.group({
            groupName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            groupDescription: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(25)]]
        });
        
        
	}
    
    ngAfterViewInit(){
        this._validationService.setValidationWatchFor(this.newgroupForm)
            .forEach((valObj: ISetValWatch)=> valObj.elementObs.subscribe(
                (x)=>{
                    this.valMsgs[valObj.controlName] = this._validationService.getValidationMessage();
                }
            ));
    }
    
    createNewGroup(){
		if (this.newgroupForm.valid){
			const { groupName, groupDescription } = this.newgroupForm.value;
			this._dataService.createNewGroup({ title: groupName, intro: groupDescription, users: [] })
				.subscribe(
					(res)=>{
						this._router.navigate(['/group/'+ res.id]);
					},
					(err)=>{
						console.log(err);
					}
				);
		    console.log(this.newgroupForm.value);
		}else{
			console.log("From Not Valid");
			this._validationService.validateFormOnSubmit(this.newgroupForm);
		}
    }

}
