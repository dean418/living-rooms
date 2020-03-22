import { Canvas } from './canvas.js';
import { Person } from './person.js';
let male = new Person('male');
let female = new Person('female');
let canvas = new Canvas([male, female]);
canvas.init();
