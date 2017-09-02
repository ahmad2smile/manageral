import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { DataService, ValidationService } from "../../services/index";

import { ISetValWatch } from "../../interfaces/index";

declare var $: any;

@Component({
	selector: 'app-newuser',
	templateUrl: './newuser.component.html',
	styleUrls: ['./newuser.component.sass']
})
export class NewuserComponent implements OnInit, AfterViewInit{
    constructor(private _dataService: DataService,
				private _router: Router,
                private _validationService: ValidationService,
                private _formBuilder: FormBuilder){
		this.getAllGroups();
	}
    
    private newuserForm: FormGroup;
    private valMsgs: Object = {};
	
	private allGroups: Array<any> = [];
    private selectedGroup: number;
    
	ngOnInit(){
        this.newuserForm = this._formBuilder.group({
            userName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            defaultGroup: ["", [Validators.required]]
        });
	}
    
    ngAfterViewInit(){
        this._validationService.setValidationWatchFor(this.newuserForm)
            .forEach((valObj: ISetValWatch)=> valObj.elementObs.subscribe(
                (x)=>{
                    this.valMsgs[valObj.controlName] = this._validationService.getValidationMessage();
                }
            ));

        //initialize jquery plugin for select opts
        $("select").material_select();
    }
	
	getAllGroups(){
		this._dataService.getAllGroups().subscribe(
			(res)=>{
				this.allGroups = res;
				console.log(res);
				
				//update jquery plugin for select opts
		        setTimeout(()=>{
					$("select").material_select();
				}, 500);
			},
			(err)=>{
				console.log(err);
			}
		);
	}
    
    createNewUser(){
		if (this.newuserForm.valid){
			let { userName, defaultGroup } = this.newuserForm.value;
			defaultGroup = parseInt(defaultGroup);
			this._dataService.createNewUser({ name: userName, groups: [ defaultGroup ] })
				.subscribe(
					(res)=>{
						this._router.navigate(['/user/'+ res.id]);
					},
					(err)=>{
						console.log(err);
					}
				);
		    console.log(this.newuserForm.value);
		}else{
			console.log("From Not Valid");
			this._validationService.validateFormOnSubmit(this.newuserForm);
		}
    }

}
