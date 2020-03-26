import { Main } from './main.js';
import { Person } from './person.js';
let people = {};
const start = () => {
    for (let i = 0; i < 5; i++) {
        let person = new Person(20);
        people[person.ID] = person;
    }
    let main = new Main(people);
    main.init();
};
start();
