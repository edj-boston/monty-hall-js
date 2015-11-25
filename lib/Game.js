// Constructor
var Game = function() {

	// Randomly place the car behind one door
	this.car = Math.floor(Math.random()*3);

	// Return for chaining
	return this;

}

// Choice for the host
Game.prototype.hostChoose = function() {

	do {
		var choice = Math.floor(Math.random()*3);
	} while( choice == this.guestOrigChoice || choice == this.car);

	this.hostChoice = choice;

	return this;
}


// First choice for the guest
Game.prototype.guestChoose = function() {
	this.guestOrigChoice = Math.floor(Math.random()*3);

	return this;
}


// Determine whether the guest switches and calculate
Game.prototype.toSwitch = function() {
	this.switch = ( Math.round(Math.random()) ) ? true : false;

	if(this.switch) {
		do {
			var choice = Math.floor(Math.random()*3);
		} while( choice == this.guestOrigChoice || choice == this.hostChoice);

		this.guestFinalChoice = choice;
	} else {
		this.guestFinalChoice = this.guestOrigChoice;
	}

	return this;
}


// Score the game
Game.prototype.score = function() {
	if( this.guestFinalChoice == this.car ) {
		this.score = true;
	} else {
		this.score = false;
	}

	return this;
}


// Helper method to log output
Game.prototype.consoleLog = function() {
	console.log(this);

	return this;
}


// Exports
module.exports = Game;