import {Main} from './main.js';
import {Person} from './person.js';
import {Virus} from './virus.js';

let people: Person[] = [];

for (let i = 0; i < 6; i++) {
    people.push(new Person(20));
}

let canvas = new Main(people);
canvas.init();