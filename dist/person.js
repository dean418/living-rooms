import { TextEntity } from './textEntity.js';
export class Person extends TextEntity {
    constructor(age = 0) {
        super(undefined);
        this.age = age;
        this.dead = false;
        this.gender = Math.round(Math.random());
        this.updateAge();
        this.checkAge();
    }
    checkAge() {
        if (this.age < 20) {
            this.text = 'child';
            return;
        }
        if (this.gender) {
            this.text = 'male';
        }
        else {
            this.text = 'female';
        }
    }
    updateAge() {
        setInterval(() => {
            this.age++;
            this.checkAge();
        }, 1000);
    }
}
