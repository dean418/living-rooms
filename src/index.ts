import {Main} from './main.js';
import {Person} from './person.js';

let people: object = {};

const start = (): void => {
    for (let i = 0; i < 5; i++) {
        let person: Person = new Person(20);
        people[person.ID] = person;
    }

    let main: Main = new Main(people);
    main.init();
}

start();