import {Main} from './main.js';
import {Person} from './person.js';

let people: object = {};

const loop = (canvas: Main): void => {
    let randNum: number = canvas.genRandNum(50000, 70000);

    setTimeout(() => {
        canvas.outbreak();
        loop(canvas);
    }, randNum);
}

const start = (): void => {
    for (let i = 0; i < 13; i++) {
        let person: Person = new Person(20);
        people[person.ID] = person;
    }

    let canvas: Main = new Main(people);
    canvas.init();

    loop(canvas);
}

start();