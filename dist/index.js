import { Canvas } from './canvas.js';
import { Person } from './person.js';
let male = new Person();
let female = new Person();
let canvas = new Canvas([male, female]);
canvas.init();
