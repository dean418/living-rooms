import {Canvas} from './canvas.js';
import {Person} from './person.js';
import { TextEntity } from './textEntity.js';
import { Virus } from './virus.js';

export class Main extends Canvas{
	constructor(entities: TextEntity[]) {
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

	private main(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);

		for (let i = this.textEntities.length-1; i >= 0; i--) {
			
			if (this.textEntities[i].expired && !this.textEntities[i].hasExpired) {	
				this.textEntities[i].hasExpired = true;			
				this.removeEntity(this.textEntities[i], 5000);
			}

			this.textEntities[i].drawText(this.textEntities[i].expired);

			for(let j = this.textEntities.length-1; j >= 0; j--) {
				if (i != j && this.textEntities[i].intersects(this.textEntities[j])) {
					this.handleCollision(this.textEntities[i], this.textEntities[j]);
					break;
				}
			}
		}
		window.requestAnimationFrame(this.main.bind(this));
	}

	private handleCollision(subject, collider) {

		let entities: Set<any> = new Set();

		entities.add(subject.text);
		entities.add(collider.text);

		if(entities.has('male') && entities.has('female')) {
			this.handlePersonCollision(subject, collider);
			return
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

			this.textEntities.push(child);
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

		let index: number = this.textEntities.indexOf(entity);
				
		this.textEntities.splice(index, 1);
	}

	public outbreak(): void {
		setTimeout(() => {
			for (let i = 0; i < 5; i++) { //this.genRandNum(10, 15)
				this.textEntities.push(new Virus());
			}
		}, 10000);
	}
}