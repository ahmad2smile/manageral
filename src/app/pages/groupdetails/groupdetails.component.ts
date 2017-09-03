import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { DataService } from "../../services/index";

@Component({
	selector: 'app-groupdetails',
	templateUrl: './groupdetails.component.html',
	styleUrls: ['./groupdetails.component.sass']
})
export class GroupdetailsComponent implements OnInit{
	constructor(private _route: ActivatedRoute,
				private _router: Router,
				private _dataService: DataService,
				private _formBuilder: FormBuilder){
    }
    
    private title: string = "";
    private intro: string = "";
	
	private navParamId: number;
	
	private allUsers: Array<any> = [];

	private groupUsersIds: Array<any> = [];
	private groupUsers: Array<any> = [];

	private delGroup: string = "Delete Group";

	ngOnInit(){
        this._route.params.subscribe(
            (res)=>{
                this.navParamId = res.id;
                this.getGroupDetails(this.navParamId);
            }
        );
	}
	
	getGroupDetails(groupId: number){
		this._dataService.getGroupDetails(groupId).subscribe(
			(res)=>{
				this.title = res.title;
				this.intro = res.intro;
				this.groupUsersIds = res.users;
				this.getAllUsers();
			},
			(err)=>{
				console.log(err);
			}
		);
	}
	
	getAllUsers(){
		this._dataService.getAllUsers().subscribe(
			(res)=>{
				this.allUsers = res;
				this.groupUsers = this.allUsers
						.filter((user)=> this.groupUsersIds.includes(user.id));
			},
			(err)=>{
				console.log(err);
			}
		);
	}
	
	deleteGroup(): any{
		if (this.delGroup === "Delete Group") {
		    this.delGroup = "Are you sure?";
			return;
		}
		this._dataService.deleteGroup(this.navParamId).subscribe(
			(res)=>{
				this._router.navigate(['/groups']);
			},
			(err)=>{
				console.log(err);
			}
		)
	}
	
	goToUserDetails(userId: number): any{
		this._router.navigate(['/user/' + userId]);
	}

}
