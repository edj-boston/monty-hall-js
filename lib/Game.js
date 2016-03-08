'use strict';

class Game {
    constructor () {
        // Randomly place the car behind one door
        this.car = Math.floor(Math.random() * 3);
    }

    // Choice for the host
    hostChoose () {
        let choice;
        do {
            choice = Math.floor(Math.random() * 3);
        } while (choice == this.guestOrigChoice || choice == this.car);

        this.hostChoice = choice;

        return this;
    }

    // First choice for the guest
    guestChoose () {
        this.guestOrigChoice = Math.floor(Math.random() * 3);

        return this;
    }

    // Determine whether the guest switches and calculate
    toSwitch () {
        this.switch = Math.round(Math.random()) === 1;

        if (this.switch) {
            let choice;
            do {
                choice = Math.floor(Math.random() * 3);
            } while (choice == this.guestOrigChoice || choice == this.hostChoice);
            this.guestFinalChoice = choice;
        } else {
            this.guestFinalChoice = this.guestOrigChoice;
        }

        return this;
    }

    // Score the game
    score () {
        if (this.guestFinalChoice == this.car) {
            this.score = true;
        } else {
            this.score = false;
        }

        return this;
    }
}

// Exports
module.exports = Game;
