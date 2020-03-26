import { TextEntity } from './textEntity.js';
export class Person extends TextEntity {
    constructor(age = 0) {
        super(undefined);
        this.age = age;
        this.maxAge = this.genRandNum(50, 100);
        this.expired = false;
        this.hasExpired = false;
        this.oddEven = Math.round(Math.random());
        this.speedBoost = 0;
        if (this.oddEven) {
            this.gender = 'male';
        }
        else {
            this.gender = 'female';
        }
        this.updatePerson();
        this.checkAge();
    }
    expire() {
        this.expired = true;
        this.text = 'dead';
    }
    checkAge() {
        if (this.expired) {
            return;
        }
        if (this.age > this.maxAge) {
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
    updatePerson() {
        setInterval(() => {
            this.age++;
            this.checkAge();
            console.log(this.speedBoost);
            if (this.speedBoost) {
                this.speedBoost--;
            }
            else if (!this.speedBoost && this.dx > 3) {
                console.log('it is');
                this.increaseSpeed(-3);
            }
        }, 1000);
    }
    increaseSpeed(amount) {
        let arr = ['dx', 'dy'];
        for (const xy of arr) {
            if (Math.sign(this[xy])) {
                this[xy] += amount;
            }
            else {
                this[xy] -= amount;
            }
        }
        this.speedBoost += 3;
    }
}
