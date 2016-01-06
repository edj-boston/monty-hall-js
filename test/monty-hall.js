var MontyHall = require('../lib/Monty-Hall.js');


describe('MontyHall', function() {

    it('Should run the proper number of games', function() {
        var num = 100;
        var m = new MontyHall(num);

        m.games.length
            .should.equal(num);
    });

});