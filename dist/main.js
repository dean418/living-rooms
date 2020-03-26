import { Canvas } from './canvas.js';
import { Person } from './person.js';
import { TextEntity } from './textEntity.js';
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
    testObject() {
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
    main() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.testObject();
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
        if (entities.has('food') && !entities.has('dead') && !entities.has('child')) {
            this.handleFoodCollision(subject, collider);
            return;
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
            this.textEntities[child.ID] = child;
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
    handleFoodCollision(subject, collider) {
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
    pause(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }
    async removeEntity(entity, time = 0) {
        await this.pause(time);
        delete this.textEntities[entity.ID];
    }
    outbreak() {
        for (let i = 0; i < this.genRandNum(15, 20); i++) {
            let virus = new TextEntity('virus');
            this.textEntities[virus.ID] = virus;
        }
    }
}
