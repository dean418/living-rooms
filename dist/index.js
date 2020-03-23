import { Canvas } from './canvas.js';
import { Person } from './person.js';
class Main extends Canvas {
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
        for (let i = 0; i < this.textEntities.length; i++) {
            this.textEntities[i].drawText();
            for (let j = 0; j < this.textEntities.length; j++) {
                if (i != j && this.textEntities[i].intersects(this.textEntities[j])) {
                    this.handleCollision(this.textEntities[i], this.textEntities[j]);
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
        }
        if (entities.has('virus') && entities.size > 1 && !entities.has('food')) {
            this.removeEntity(subject);
            this.removeEntity(collider);
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
        for (let i = 0; i < 5; i++) {
            let child = new Person();
            child.x = subject.x + this.genRandInt(50, 100);
            child.y = collider.y + this.genRandInt(50, 100);
            this.textEntities.push(child);
        }
    }
    removeEntity(entity) {
        let index = this.textEntities.indexOf(entity);
        this.textEntities.splice(index, 1);
    }
}
let male = new Person(20);
let female = new Person(20);
let canvas = new Main([male, female]);
canvas.init();
