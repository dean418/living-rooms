export class Canvas {
    constructor(textEntity) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.textEntities = textEntity;
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
