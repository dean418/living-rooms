import {Main} from './main.js';
import {Person} from './person.js';

let people: object = {};

const loop = (canvas) => {
    let randNum = canvas.genRandNum(40000, 50000);

    setTimeout(() => {
        canvas.outbreak();
        loop(canvas);
    }, randNum);
}

const start = () => {
    for (let i = 0; i < 7; i++) {
        let person = new Person(20);
        console.log(person.ID);

        people[person.ID] = person;
    }

    let canvas = new Main(people);
    canvas.init();

    loop(canvas);
}

start();