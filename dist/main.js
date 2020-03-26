import { TextEntity } from './textEntity.js';
import { RandNum } from './lib/randNum.js';
import { Canvas } from './canvas.js';
import { Person } from './person.js';
import { Food } from './food.js';
export class Main {
    constructor(entities) {
        this.canvas = new Canvas();
        this.textEntities = entities;
    }
    init() {
        this.outbreak();
        this.spawnFood();
        window.requestAnimationFrame(this.main.bind(this));
    }
    main() {
        this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
        this.testObject();
        window.requestAnimationFrame(this.main.bind(this));
    }
    genRandInt(min, max) {
        let randInt = new RandNum(min, max).num;
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
    handleCollision(subject, collider) {
        let entities = new Set();
        entities.add(subject.text);
        entities.add(collider.text);
        if (entities.has('male') && entities.has('female')) {
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
        let randNum = new RandNum(50000, 70000).num;
        setTimeout(() => {
            let total = new RandNum(15, 20).num;
            for (let i = 0; i < total; i++) {
                let virus = new TextEntity('virus');
                this.textEntities[virus.ID] = virus;
            }
            this.outbreak();
        }, randNum);
    }
    spawnFood() {
        let randNum = new RandNum(5000, 10000).num;
        setTimeout(() => {
            let food = new Food();
            this.textEntities[food.ID] = food;
            this.spawnFood();
        }, randNum);
    }
}
