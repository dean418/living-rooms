import { Canvas } from './canvas.js';
export class TextEntity {
    constructor(text) {
        this.ID = this.genID();
        this.canvas = new Canvas();
        this.text = text;
        this.styleText();
        this.x = this.genCoord(this.canvas.width - this.textWidth);
        this.y = this.genCoord(this.canvas.height - parseInt(this.canvas.ctx.font));
        this.dx = this.genDirection();
        this.dy = this.genDirection();
    }
    get top() {
        return this.y;
    }
    get bottom() {
        return this.y + parseInt(this.canvas.ctx.font);
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.textWidth;
    }
    drawText(expired = false) {
        this.styleText();
        if (!expired) {
            this.checkBounds();
        }
        this.canvas.ctx.fillText(this.text, this.x, this.y);
    }
    intersects(entity) {
        if (this.top > entity.bottom) {
            return false;
        }
        if (this.right < entity.left) {
            return false;
        }
        if (this.bottom < entity.top) {
            return false;
        }
        if (this.left > entity.right) {
            return false;
        }
        return true;
    }
    genID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    genCoord(max) {
        let coord = Math.random() * max;
        return coord;
    }
    genDirection(speed = 3) {
        let direction = Math.round(Math.random());
        if (direction) {
            return speed;
        }
        return -speed;
    }
    styleText() {
        this.canvas.ctx.font = '16pt arial';
        this.canvas.ctx.fillStyle = 'white';
        if (this.text == 'virus') {
            this.canvas.ctx.fillStyle = 'green';
        }
        else if (this.text == 'food') {
            this.canvas.ctx.fillStyle = 'red';
        }
        else if (this.text == 'dead') {
            this.canvas.ctx.fillStyle = 'grey';
        }
        this.textWidth = this.canvas.ctx.measureText(this.text).width;
    }
    checkBounds() {
        if (this.y + this.dy > this.canvas.height || this.y + this.dy < parseInt(this.canvas.ctx.font)) {
            this.dy = -this.dy;
        }
        if (this.x + this.dx > this.canvas.width - this.textWidth || this.x + this.dx < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}
