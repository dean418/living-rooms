export class Canvas {
    constructor(textEntity) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.textEntities = textEntity;
    }
    main() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.textEntities.length; i++) {
            this.textEntities[i].drawText();
            for (let j = 0; j < this.textEntities.length; j++) {
                if (i != j && this.textEntities[j].intersects(this.textEntities[i])) {
                    console.log('ABUSE!!!!');
                }
            }
        }
        window.requestAnimationFrame(this.main.bind(this));
    }
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.requestAnimationFrame(this.main.bind(this));
    }
}
