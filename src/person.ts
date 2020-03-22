import {TextEntity} from './textEntity.js';

export class Person extends TextEntity {
	age: number;
	dead: boolean;
	gender: number;

	constructor(age: number=0) {
		super(undefined);

		this.age = age;
		this.dead = false;
		this.gender = Math.round(Math.random());

		this.updateAge();
		this.checkAge();
	}

	private checkAge():void {
		if (this.age < 20) {
			this.text = 'child';
			return;
		}

		if(this.gender) {
			this.text = 'male';
		} else {
			this.text = 'female';
		}
	}

	private updateAge(): void {
		setInterval(() => {
			this.age++;
			this.checkAge();
		}, 1000);
	}
}