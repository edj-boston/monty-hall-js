'use strict';

const MontyHall = require('../lib/Monty-Hall.js');


describe('MontyHall', () => {
    it('Should run the proper number of games', () => {
        const num = 100;
        const monty = new MontyHall(num);

        monty.games.length
            .should.equal(num);
    });

    it('The number of switch and stay games should equal the total', () => {
        const num = 100;
        const monty = new MontyHall(num);

        (monty.results.stays + monty.results.switches)
            .should.equal(monty.games.length);
    });
});
