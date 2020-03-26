import {TextEntity} from "./textEntity.js";

export class Food extends TextEntity {
	constructor() {
		super('food');
	}

	protected checkBounds(): void{
		//shrug
	}
}
