import { Main } from './main.js';
import { Person } from './person.js';
let people = [];
for (let i = 0; i < 6; i++) {
    people.push(new Person(20));
}
let canvas = new Main(people);
canvas.init();
