import {Canvas} from './canvas.js';
import {Person} from './person.js';
import { TextEntity } from './textEntity.js';

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
		Object.keys(this.textEntities).forEach((key) => {
			let entity = this.textEntities[key];

			if (entity.expired && !entity.hasExpired) {
				entity.hasExpired = true;
				this.removeEntity(entity, 5000);
			}

			entity.drawText(entity.expired);

			Object.keys(this.textEntities).forEach((comparisonKey) => {
				let comparison = this.textEntities[comparisonKey];

				if (entity.ID != comparison.ID && entity.intersects(comparison)) {
					this.handleCollision(entity, comparison);
				}
			})
		});
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

		if (entities.has('virus') && entities.size > 1 && !entities.has('dead')) {
			this.handleVirusCollision(subject, collider);
			return;
		}

		if (entities.has('male') || entities.has('female') && entities.has('food')) {
			// speed boost
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
		for (let i = 0; i < this.genRandNum(10, 15); i++) {
			let virus: TextEntity = new TextEntity('virus');
			this.textEntities[virus.ID] = virus;
		}
	}
}