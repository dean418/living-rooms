import { TextEntity } from './textEntity.js';
export class Person extends TextEntity {
    constructor(age = 0) {
        super(undefined);
        this.age = age;
        this.dead = false;
        this.oddEven = Math.round(Math.random());
        if (this.oddEven) {
            this.gender = 'male';
        }
        else {
            this.gender = 'female';
        }
        this.updateAge();
        this.checkAge();
    }
    checkAge() {
        if (this.age < 20) {
            this.text = 'child';
            return;
        }
        if (this.text == 'mother' || this.text == 'father') {
            return;
        }
        this.text = this.gender;
    }
    updateAge() {
        setInterval(() => {
            this.age++;
            this.checkAge();
            console.log(this.age);
        }, 1000);
    }
}
