import {Canvas} from './canvas.js';
import {Person} from './person.js';

let male = new Person(20);
let female = new Person(20);

let canvas = new Canvas([male, female]);
canvas.init();

// window.addEventListener('resize', canvas.resize);