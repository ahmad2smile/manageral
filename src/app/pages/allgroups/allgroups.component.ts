import { Component } from '@angular/core';

import { DataService } from "../../services/index";

@Component({
	selector: 'app-allgroups',
	templateUrl: './allgroups.component.html',
	styleUrls: ['./allgroups.component.sass']
})
export class AllgroupsComponent{
	constructor(private _dataService: DataService){
        this.getAllGroups();
    }
    
    private groups: Array<any> = [];
    
    getAllGroups(){
        this._dataService.getAllGroups().subscribe(
            (res)=>{
                this.groups = res;
            },
            (err)=>{
                console.log(err);
            }
        );
    }

}
