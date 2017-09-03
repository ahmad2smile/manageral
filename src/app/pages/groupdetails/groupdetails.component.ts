import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";

import { DataService } from "../../services/index";

@Component({
	selector: 'app-groupdetails',
	templateUrl: './groupdetails.component.html',
	styleUrls: ['./groupdetails.component.sass']
})
export class GroupdetailsComponent implements OnInit{
	constructor(private _route: ActivatedRoute,
                private _dataService: DataService){
        
    }
    
    private title: string = "";
    private intro: string = "";

	ngOnInit(){
        this._route.params.subscribe(
            (res)=>{
                console.log(res.id);
                this.getGroupDetails(res.id);
            }
        );
	}
    
    getGroupDetails(groupId: number){
        this._dataService.getGroupDetails(groupId).subscribe(
            (res)=>{
                this.title = res.title;
                this.intro = res.intro;
            },
            (err)=>{
                console.log(err);
            }
        );
    }

}
