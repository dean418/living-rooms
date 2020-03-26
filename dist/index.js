import { Main } from './main.js';
import { Person } from './person.js';
import { Food } from './food.js';
let people = {};
const loop = (canvas) => {
    let randNum = canvas.genRandNum(50000, 70000);
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
    let food = new Food();
    people[food.ID] = food;
    let canvas = new Main(people);
    canvas.init();
    loop(canvas);
};
start();
