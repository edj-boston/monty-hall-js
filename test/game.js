var Game   = require('../lib/Game.js');


describe('Game', function() {

    it('Should have certain properties and values', function() {
        var game = new Game()
            .guestChoose()
            .hostChoose()
            .toSwitch()
            .score();

        game.car.should.be.type('number').and.be.within(0, 2);
        game.guestOrigChoice.should.be.type('number').and.be.within(0, 2);
        game.hostChoice.should.be.type('number').and.be.within(0, 2);
        game.switch.should.be.type('boolean');
        game.guestFinalChoice.should.be.type('number').and.be.within(0, 2);
        game.score.should.be.type('boolean');
    });

});