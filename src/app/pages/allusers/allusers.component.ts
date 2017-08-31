import { Component } from '@angular/core';

import { DataService } from "../../services/index";

@Component({
	selector: 'app-allusers',
	templateUrl: './allusers.component.html',
	styleUrls: ['./allusers.component.sass']
})
export class AllusersComponent{
	constructor(private _dataService: DataService){
        this.getAllUsers();
    }
    
    private users: Array<any> = [];
    
    getAllUsers(){
        this._dataService.getAllUsers().subscribe(
            (res)=>{
                this.users = res;
            },
            (err)=>{
                console.log(err);
            }
        )
    }
}
