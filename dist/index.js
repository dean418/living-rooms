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
            console.log('hello');
            let thing = new Person();
        }
        if (entities.has('virus') && entities.size > 1 && !entities.has('food')) {
            this.removeEntity(subject);
            this.removeEntity(collider);
        }
        if (entities.has('male') || entities.has('female') && entities.has('food')) {
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
