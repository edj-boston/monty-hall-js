var should = require('should'),
	Game = require('../lib/Game.js');


describe('Game', function() {

	it('Should have certain properties and values', function() {
		// New up a game
		var game = new Game()
			.guestChoose()
			.hostChoose()
			.toSwitch()
			.score()
			.consoleLog();

		game.car.should.be.type('number').and.be.within(0, 2);
		game.guestOrigChoice.should.be.type('number').and.be.within(0, 2);
		game.hostChoice.should.be.type('number').and.be.within(0, 2);
  		game.switch.should.be.type('number').and.be.within(0, 1);
		game.guestFinalChoice.should.be.type('number').and.be.within(0, 2);
		game.score.should.be.type('boolean');
	});

});