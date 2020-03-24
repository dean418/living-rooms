import { Canvas } from './canvas.js';
import { Person } from './person.js';
export class Main extends Canvas {
    constructor(entities) {
        super(entities);
    }
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.requestAnimationFrame(this.main.bind(this));
    }
    genRandInt(min, max) {
        let randInt = Math.floor(Math.random() * (max - min + 1)) + min;
        let positive = Math.round(Math.random());
        if (positive) {
            return randInt;
        }
        return -randInt;
    }
    main() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = this.textEntities.length - 1; i >= 0; i--) {
            if (this.textEntities[i].expired && !this.textEntities[i].hasExpired) {
                this.textEntities[i].hasExpired = true;
                this.removeEntity(this.textEntities[i], 5000);
            }
            this.textEntities[i].drawText(this.textEntities[i].expired);
            for (let j = this.textEntities.length - 1; j >= 0; j--) {
                if (i != j && this.textEntities[i].intersects(this.textEntities[j])) {
                    this.handleCollision(this.textEntities[i], this.textEntities[j]);
                    break;
                }
            }
        }
        window.requestAnimationFrame(this.main.bind(this));
    }
    handleCollision(subject, collider) {
        let entities = new Set();
        entities.add(subject.text);
        entities.add(collider.text);
        if (entities.has('male') && entities.has('female')) {
            this.handlePersonCollision(subject, collider);
            return;
        }
        if (entities.has('virus') && entities.size > 1 && !entities.has('dead')) {
            this.handleVirusCollision(subject, collider);
            return;
        }
        if (entities.has('male') || entities.has('female') && entities.has('food')) {
        }
    }
    handlePersonCollision(subject, collider) {
        for (const arg of arguments) {
            if (arg.text == 'female') {
                arg.text = 'mother';
            }
            else {
                arg.text = 'father';
            }
        }
        for (let i = 0; i < 4; i++) {
            let child = new Person();
            child.x = subject.x + this.genRandInt(50, 100);
            child.y = collider.y + this.genRandInt(50, 100);
            this.textEntities.push(child);
        }
    }
    handleVirusCollision(subject, collider) {
        for (const entity of arguments) {
            if (entity.text == 'virus') {
                this.removeEntity(entity);
                continue;
            }
            entity.expire();
            this.removeEntity(entity, 5000);
        }
    }
    removeEntity(entity, time = 0) {
        setTimeout(() => {
            let index = this.textEntities.indexOf(entity);
            this.textEntities.splice(index, 1);
        }, time);
    }
}
