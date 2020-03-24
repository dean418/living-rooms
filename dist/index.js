import { Main } from './main.js';
import { Person } from './person.js';
let people = [];
const loop = (canvas) => {
    let randNum = canvas.genRandNum(40000, 50000);
    setTimeout(() => {
        canvas.outbreak();
        loop(canvas);
    }, randNum);
};
const start = () => {
    for (let i = 0; i < 7; i++) {
        people.push(new Person(20));
    }
    let canvas = new Main(people);
    canvas.init();
    loop(canvas);
};
start();
