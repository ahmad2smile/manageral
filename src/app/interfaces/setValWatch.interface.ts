import { Observable } from "rxjs/Observable";

export interface ISetValWatch{
	controlName: string,
	elementObs: Observable<any>
}
