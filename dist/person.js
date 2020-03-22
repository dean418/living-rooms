import { TextEntity } from './textEntity.js';
export class Person extends TextEntity {
    constructor(value) {
        super(value);
        this.age = 0;
    }
}
