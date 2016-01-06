// Internal dep
var Game = require('./Game.js');


// Constructor
var MontyHall = function(n) {

    // Initialize results object
    this.results = {
        switches    : 0,
        switchWins  : 0,
        stays       : 0,
        stayWins    : 0
    };

    // Run `n` number of games and tally results
    this.games = Array.apply(null, Array(n)).map(function() {
        
        var g = new Game()
            .guestChoose()
            .hostChoose()
            .toSwitch()
            .score();

        // Parse switches and stays
        if (g.switch) {
            this.results.switches++;
            if (g.score) this.results.switchWins++;
        } else {
            this.results.stays++;
            if (g.score) this.results.stayWins++;
        }

        return g;

    }.bind(this));

    // Calculate the percent
    this.results.switchWinPercent = Math.round(this.results.switchWins / this.results.switches * 100);
    this.results.stayWinPercent = Math.round(this.results.stayWins / this.results.stays * 100);

};


// Export
module.exports = MontyHall;