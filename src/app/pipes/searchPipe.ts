import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: "searchFor"
})
export class SearchPipe implements PipeTransform{
	transform(dataArray: Array<any>, searchParam: string, prop: string){
		return (dataArray.length && searchParam.length) ?
            dataArray.filter(
				data => data[prop].toUpperCase().includes(searchParam.toUpperCase())
			)
			: dataArray;
	}
}