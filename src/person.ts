import {TextEntity} from './textEntity.js';

export class Person extends TextEntity {
	public dead: boolean;
	private age: number;
	private gender: string;
	private oddEven: number;

	constructor(age: number=0) {
		super(undefined);

		this.age = age;
		this.dead = false;
		this.oddEven = Math.round(Math.random());

		if(this.oddEven) {
			this.gender = 'male';
		} else {
			this.gender = 'female';
		}

		this.updateAge();
		this.checkAge();
	}

	private checkAge():void {
		if (this.age < 20) {
			this.text = 'child';
			return;
		}

		if (this.text == 'mother' || this.text == 'father') {
			return;
		}

		this.text = this.gender;
	}

	private updateAge(): void {
		setInterval(() => {
			this.age++;
			this.checkAge();
			console.log(this.age);

		}, 1000);
	}
}