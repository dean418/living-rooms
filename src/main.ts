import {TextEntity} from './textEntity.js';
import {RandNum} from './lib/randNum.js';
import {Canvas} from './canvas.js';
import {Person} from './person.js';
import {Food} from './food.js';

export class Main {
	protected canvas: Canvas;
	public textEntities: object;

	constructor(entities?: object) {
		this.canvas = new Canvas();
		this.textEntities = entities;
	}

	public init(): void {
		this.outbreak();
		this.spawnFood();
		window.requestAnimationFrame(this.main.bind(this));
	}

	private main(): void {
		this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
		this.testObject();

		window.requestAnimationFrame(this.main.bind(this));
	}

	private genRandInt(min: number, max: number): number {
		let randInt: number = new RandNum(min, max).num
		let positive = Math.round(Math.random())

		if (positive) {
			return randInt;
		}
		return -randInt;
	}

	private testObject(): void {
		for (let [key, entity] of Object.entries(this.textEntities)) {
			if (entity.expired && !entity.hasExpired) {
				entity.hasExpired = true;
				this.removeEntity(entity, 5000);
			}

			entity.drawText(entity.expired);
			for (let [key, comparison] of Object.entries(this.textEntities)) {
				if (entity.ID != comparison.ID && entity.intersects(comparison)) {
					this.handleCollision(entity, comparison);
				}
			}
		}
	}

	private handleCollision(subject, collider): void {

		let entities: Set<any> = new Set();

		entities.add(subject.text);
		entities.add(collider.text);

		if(entities.has('male') && entities.has('female')) {
			this.handlePersonCollision(subject, collider);
			return;
		}

		if (entities.has('virus') && entities.size > 1 && !entities.has('dead') && !entities.has('food')) {
			this.handleVirusCollision(subject, collider);
			return;
		}

		if (entities.has('food') && !entities.has('dead') && !entities.has('child')) {
			this.handleFoodCollision(subject, collider);
			return;
		}
	}

	private handlePersonCollision(subject: TextEntity, collider: TextEntity): void {
		for (const arg of arguments) {
			if (arg.text == 'female') {
				arg.text = 'mother';
			} else {
				arg.text = 'father';
			}
		}

		for (let i = 0; i < 4; i++) {
			let child: Person = new Person();

			child.x = subject.x + this.genRandInt(50, 100);
			child.y = collider.y + this.genRandInt(50, 100);

			this.textEntities[child.ID] = child;
		}
	}

	private handleVirusCollision(subject: TextEntity, collider: TextEntity): void {
		for (const entity of arguments) {
			if (entity.text == 'virus') {
				this.removeEntity(entity);
				continue;
			}

			entity.expire();
			this.removeEntity(entity, 5000);
		}
	}

	private handleFoodCollision(subject, collider): void {
		for (const entity of arguments) {
			if (entity.text == 'food') {
				this.removeEntity(entity);
				continue;
			}

			if (entity.speedBoost == 0) {
				entity.increaseSpeed(3);
			}
		}
	}

	private pause(time: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, time);
		});
	}

	private async removeEntity(entity: TextEntity, time: number=0): Promise<void> {
		await this.pause(time);
		delete this.textEntities[entity.ID];
	}

	public outbreak(): void {
		let randNum: number = new RandNum(50000, 70000).num;

		setTimeout(() => {
			let total: number = new RandNum(15, 20).num;

			for (let i = 0; i < total; i++) {
				let virus: TextEntity = new TextEntity('virus');
				this.textEntities[virus.ID] = virus;
			}

			this.outbreak();
		}, randNum);
	}

	private spawnFood(): void {
		let randNum: number = new RandNum(5000, 10000).num;

		setTimeout(() => {
			let food = new Food();

			this.textEntities[food.ID] = food;

			this.spawnFood();
		}, randNum);
	}
}