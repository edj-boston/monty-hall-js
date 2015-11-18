var should = require('should'),
	MontyHall = require('../lib/Monty-Hall.js');


describe('MontyHall', function() {

	it('Should run the proper number of games', function() {
		var num = 10;
		var m = new MontyHall(num);

		should.equal(num, m.games.length);
	});

});