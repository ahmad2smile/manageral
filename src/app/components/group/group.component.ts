import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.sass']
})
export class GroupComponent implements OnInit{
	constructor(){
        
    }
    
    @Input() id: number = 0;
    @Input() title: string = "";
    @Input() intro: string = "";

	ngOnInit(){
	}

}
