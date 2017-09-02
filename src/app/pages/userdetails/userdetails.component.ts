import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";

import { DataService } from "../../services/index";

@Component({
	selector: 'app-userdetails',
	templateUrl: './userdetails.component.html',
	styleUrls: ['./userdetails.component.sass']
})
export class UserdetailsComponent implements OnInit{
    constructor(private _route: ActivatedRoute,
                private _dataService: DataService){
        
    }

    private name: string = "";

    ngOnInit(){
        this._route.params.subscribe(
            (res)=>{
                console.log(res.id);
                this.getUserDetails(res.id);
            }
        );
    }

    getUserDetails(userId: string){
        this._dataService.getUserDetails(userId).subscribe(
            (res)=>{
                this.name = res.name;
            },
            (err)=>{
                console.log(err);
            }
        );
    }

}
