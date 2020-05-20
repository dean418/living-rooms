import { TextEntity } from './textEntity.js';
import { RandNum } from './lib/randNum.js';
import { Canvas } from './canvas.js';
import { Person } from './person.js';
import { Food } from './food.js';
export class Main {
    constructor() {
        this.canvas = new Canvas();
        this.textEntities = {};
        this.resetBtn = document.getElementById('reset');
        this.resetBtn.addEventListener('click', () => this.reset());
        this.createEntities();
    }
    init() {
        this.outbreak();
        this.spawnFood();
        this.main();
    }
    reset() {
        cancelAnimationFrame(this.animationFrameID);
        clearInterval(this.outbreakID);
        clearInterval(this.foodID);
        this.textEntities = {};
        this.createEntities();
        this.outbreak();
        this.spawnFood();
        this.main();
    }
    createEntities() {
        for (let i = 0; i < 5; i++) {
            let person = new Person(20);
            this.outOfBounds(person);
            this.textEntities[person.ID] = person;
        }
    }
    main() {
        this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
        this.testObject();
        this.animationFrameID = window.requestAnimationFrame(this.main.bind(this));
    }
    genRandInt(min, max) {
        let randInt = new RandNum(min, max).num;
        let positive = Math.round(Math.random());
        if (positive) {
            return randInt;
        }
        return -randInt;
    }
    outOfBounds(entity) {
        if (entity.checkTop()) {
            entity.y -= 20;
        }
        if (entity.checkBottom()) {
            entity.y += 20;
        }
        if (entity.checkLeft()) {
            entity.x += entity.textWidth;
        }
        if (entity.checkRight()) {
            entity.x -= entity.textWidth;
        }
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
            this.personCollision(subject, collider);
            return;
        }
        if (entities.has('virus') && entities.size > 1 && !entities.has('dead') && !entities.has('food')) {
            this.virusCollision(subject, collider);
            return;
        }
        if (entities.has('food') && !entities.has('dead') && !entities.has('child')) {
            this.foodCollision(subject, collider);
            return;
        }
    }
    personCollision(subject, collider) {
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
            this.outOfBounds(child);
            this.textEntities[child.ID] = child;
        }
    }
    virusCollision(subject, collider) {
        for (const entity of arguments) {
            if (entity.text == 'virus') {
                this.removeEntity(entity);
                continue;
            }
            entity.expire();
            this.removeEntity(entity, 5000);
        }
    }
    foodCollision(subject, collider) {
        for (const entity of arguments) {
            if (entity.text == 'food') {
                this.removeEntity(entity);
                continue;
            }
            if (entity.speedBoost == 0) {
                entity.increaseSpeed(2);
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
        this.outbreakID = setTimeout(() => {
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
        this.foodID = setTimeout(() => {
            let foodNum = new RandNum(1, 4).num;
            for (let i = 0; i < foodNum; i++) {
                let food = new Food();
                this.outOfBounds(food);
                this.textEntities[food.ID] = food;
            }
            this.spawnFood();
        }, randNum);
    }
}
