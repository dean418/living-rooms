export class Canvas {
    constructor(textEntity) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.textEntities = textEntity;
    }
    genRandNum(min, max) {
        let randInt = Math.floor(Math.random() * (max - min + 1)) + min;
        return randInt;
    }
    spawnFood(interval) {
        let intervalTime = this.genRandNum(10000, 20000);
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => {
            this.spawnFood(interval);
        }, intervalTime);
    }
}
