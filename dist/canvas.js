export class Canvas {
    constructor(textEntity) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.textEntities = textEntity;
    }
}
