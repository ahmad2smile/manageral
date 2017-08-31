import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.sass']
})
export class UserComponent{
	constructor(){
        
    }
    
    @Input() id: number = 0;
    @Input() name: string = "";
}