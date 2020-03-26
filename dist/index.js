import { Main } from './main.js';
import { Person } from './person.js';
let people = {};
const loop = (canvas) => {
    let randNum = canvas.genRandNum(10000, 11000);
    setTimeout(() => {
        canvas.outbreak();
        loop(canvas);
    }, randNum);
};
const start = () => {
    for (let i = 0; i < 5; i++) {
        let person = new Person(20);
        people[person.ID] = person;
    }
    let canvas = new Main(people);
    canvas.init();
    loop(canvas);
};
start();
