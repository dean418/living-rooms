import {Canvas} from './canvas.js';
import {Person} from './person.js';
import {TextEntity} from './textEntity.js';
import {Food} from './food.js';

export class Main extends Canvas{
	constructor(entities: object) {
		super(entities);
	}

	public init(): void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		window.requestAnimationFrame(this.main.bind(this));
	}

	private genRandInt(min: number, max: number): number {
		let randInt: number = Math.floor(Math.random() * (max - min + 1)) + min;
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

	private main(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.testObject();

		window.requestAnimationFrame(this.main.bind(this));
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
		for (let i = 0; i < this.genRandNum(15, 20); i++) {
			let virus: TextEntity = new TextEntity('virus');
			this.textEntities[virus.ID] = virus;
		}
	}

	private spawnFood(interval?: number): void {
		let intervalTime = this.genRandNum(10000, 20000);

		if (interval) {
			clearInterval(interval);
		}

		interval = setInterval(() => {
			let food = new Food();

			this.textEntities[food.ID] = food;
			this.spawnFood(interval);
		}, intervalTime);
	}
}