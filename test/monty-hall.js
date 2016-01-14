var MontyHall = require('../lib/Monty-Hall.js');


describe('MontyHall', () => {

    it('Should run the proper number of games', () => {
        var num = 100;
        var m = new MontyHall(num);

        m.games.length
            .should.equal(num);
    });

});