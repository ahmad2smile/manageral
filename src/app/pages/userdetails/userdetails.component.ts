import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

import { DataService } from "../../services/index";

declare var $: any;

@Component({
	selector: 'app-userdetails',
	templateUrl: './userdetails.component.html',
	styleUrls: ['./userdetails.component.sass']
})
export class UserdetailsComponent implements OnInit {
	constructor(private _route: ActivatedRoute,
				private _router: Router,
				private _dataService: DataService,
				private _formBuilder: FormBuilder) {
		this.getAllGroups();
	}

	private navParamId: number;
	
	private allGroups: Array<any> = [];

	private name: string = "";
	private userGroups: Array<any> = [];
	private userGroupIds: Array<any> = [];
	
	private addToGroupsForm: FormGroup;
	private addToGroupsOpts: Array<any> = [];
	private groupToAddReady: boolean = false;
	
	private delUser: string = "Delete User";

	ngOnInit() {
		this._route.params.subscribe(
			(res) => {
				this.navParamId = parseInt(res.id);
				this.getUserDetails(this.navParamId);
			}
		);

		$('.modal').modal({
			dismissible: true,
			opacity: .5,
			inDuration: 300,
			outDuration: 200,
			endingTop: '10%',
			startingLeft: '50%',
			endingLeft: '50%',
			ready: function(modal, trigger){
				
			},
			complete: function(){
			}
		});
	}
	
	getAllGroups(){
		this._dataService.getAllGroups().subscribe(
			(res)=>{
				this.allGroups = res;
			},
			(err)=>{
				console.log(err);
			}
		)
	}

	getUserDetails(userId: number) {
		this._dataService.getUserDetails(userId).subscribe(
			(res) => {
				this.name = res.name;
				this.userGroupIds = res.groups || [];
				let totallUserGroupIds = this.userGroupIds.length;

				//just cause of the poor API setup by me, i had to do this
				this.userGroups = this.allGroups
					.filter((group)=> this.userGroupIds.includes(group.id));
				this.setupAddToGroupsForm();
			},
			(err) => {
				console.log(err);
			}
		);
	}
	
	setupAddToGroupsForm(){
		
		let groupsControls = {};
		
		this.allGroups.forEach((group)=>{
			groupsControls[group.title] = "";
		});
		
		//setup form
		this.addToGroupsForm = this._formBuilder.group(groupsControls);
		this.addToGroupsOpts = this.allGroups.filter((group)=> !this.userGroupIds.includes(group.id));
		this.groupToAddReady = true;
	}
	
	addToGroups(){
		console.log("Something here");
		console.log(this.addToGroupsForm.value);
		
		for (let key in this.addToGroupsForm.value) {
		    if (this.addToGroupsForm.value[key]) {
				let newGroup = this.addToGroupsOpts.find((group)=> group.title === key);
				this.userGroupIds.push(newGroup.id);
		    }
		}
		
		let userData = { name: this.name, groups: this.userGroupIds };
		this.updateUser(userData);
	}

	removeFromGroup(groupId: number) {
		let newUserGroups = this.userGroupIds.filter((x) => x !== groupId);

		let userData = { name: this.name, groups: newUserGroups };
		this.updateUser(userData);
	}

	updateUser(userData) {
		this._dataService.updateUser(this.navParamId, userData).subscribe(
			(res) => {
				this.getUserDetails(this.navParamId);
				console.log(res);
			},
			(err) => {
				console.log(err);
			}
		);
	}
	
	deleteUser(): any{
		if (this.delUser === "Delete User") {
		    this.delUser = "Are you sure?";
			return;
		}
		this._dataService.deleteUser(this.navParamId).subscribe(
			(res)=>{
				this._router.navigate(['/users']);
			},
			(err)=>{
				console.log(err);
			}
		)
	}

}
