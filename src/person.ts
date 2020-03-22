import {TextEntity} from './textEntity.js';

export class Person extends TextEntity {
	age: number;

	constructor(value: string) {
		super(value);

		this.age = 0;
	}
}