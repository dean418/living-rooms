import { Canvas } from './canvas.js';
import { Person } from './person.js';
import { Virus } from './virus.js';
let male = new Person(20);
let female = new Person(20);
let virus = new Virus();
let canvas = new Canvas([male, female, virus]);
canvas.init();
