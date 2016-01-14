var Game   = require('../lib/Game.js');


describe('Game', () => {

    it('Car should be a number in range', () => {
        var game = new Game();

        game.car.should.be.type('number')
            .and.be.within(0, 2);
    });

    it('Guest choice should be a number in range', () => {
        var game = new Game()
            .guestChoose()
            .hostChoose()
            .toSwitch()
            .score();

        game.guestOrigChoice.should.be.type('number')
            .and.be.within(0, 2);
    });

    it('Host choice should be a number in range and not be the guest choice', () => {
        var game = new Game()
            .guestChoose()
            .hostChoose();

        game.hostChoice.should.be.type('number')
            .and.be.within(0, 2)
            .and.not.equal(game.guestOrigChoice);
    });

    it('Switch should be boolean and effect the guest decision appropriately', () => {
        var game = new Game()
            .guestChoose()
            .hostChoose()
            .toSwitch();

        game.switch.should.be.type('boolean');
        game.guestFinalChoice.should.be.type('number')
            .and.be.within(0, 2)
            .and.not.equal(game.hostChoice);

        if (game.switch)
            game.guestFinalChoice.should.not.equal(game.guestOrigChoice);
        else
            game.guestFinalChoice.should.equal(game.guestOrigChoice);

    });

    it('The score should be a boolean value', () => {
        var game = new Game()
            .guestChoose()
            .hostChoose()
            .toSwitch()
            .score();

        game.score.should.be.type('boolean');
    });


});