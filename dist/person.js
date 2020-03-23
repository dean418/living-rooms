import { TextEntity } from './textEntity.js';
export class Person extends TextEntity {
    constructor(age = 0) {
        super(undefined);
        this.age = age;
        this.expired = false;
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
        if (this.expired) {
            return;
        }
        if (this.age > 40) {
            this.expire();
            return;
        }
        if (this.text == 'mother' || this.text == 'father') {
            return;
        }
        if (this.age < 20) {
            this.text = 'child';
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
    expire() {
        this.expired = true;
        this.text = 'dead';
    }
}
