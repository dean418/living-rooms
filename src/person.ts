import {TextEntity} from './textEntity.js';
import {RandNum} from './lib/randNum.js';

export class Person extends TextEntity {
	public expired: boolean;
	public hasExpired: boolean;
	private age: number;
	private maxAge: number;
	private gender: string;
	private oddEven: number;
	private speedBoost: number;

	constructor(age: number=0) {
		super(undefined);

		this.age = age;
		this.maxAge = new RandNum(60, 100).num;
		this.expired = false;
		this.hasExpired = false;
		this.oddEven = Math.round(Math.random());
		this.speedBoost = 0;

		if(this.oddEven) {
			this.gender = 'male';
		} else {
			this.gender = 'female';
		}

		this.updatePerson();
		this.checkAge();
	}

	public expire(): void {
		this.expired = true;
		this.text = 'dead';
	}

	public increaseSpeed(amount: number): void {
		let arr = ['dx', 'dy'];
		for (const xy of arr) {
			if (Math.sign(this[xy]) == 1) {
				this[xy] += amount;
			} else {
				this[xy] -= amount;
			}
		}
		this.speedBoost += 3;
	}

	private checkAge():void {
		if (this.expired) {
			return;
		}

		if (this.age > this.maxAge) {
			this.expire();
			return;
		}

		if (this.text == 'mother' || this.text == 'father') {
			return;
		}

		if (this.age < 20) {
			this.text = 'child';
			return;
		}
		this.text = this.gender;
	}

	private updatePerson(): void {
		setInterval(() => {
			this.age++;
			this.checkAge();

			if (this.speedBoost) {
				this.speedBoost--;
			} else if (this.dx < -3 || this.dx > 3) {
				this.increaseSpeed(-2)
			}
		}, 1000);
	}
}