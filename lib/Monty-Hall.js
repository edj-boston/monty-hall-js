'use strict';

const Game = require('./Game.js');

class MontyHall {
    constructor (n) {
        this.results = {
            wins             : 0,
            switches         : 0,
            switchWins       : 0,
            switchLosses     : 0,
            switchWinPercent : 0,
            stays            : 0,
            stayWins         : 0,
            stayLosses       : 0,
            stayWinPercent   : 0,
            placeholder      : 0
        };

        this.games = [];

        // Run `n` number of games and tally results
        for (let i = 0; i < n; i++) {
            const game = new Game()
                .guestChoose()
                .hostChoose()
                .toSwitch()
                .score();

            // Parse switches and stays
            if (game.switch) {
                this.results.switches++;
                if (game.score) {
                    this.results.wins++;
                    this.results.switchWins++;
                } else {
                    this.results.switchLosses++;
                }
            } else {
                this.results.stays++;
                if (game.score) {
                    this.results.wins++;
                    this.results.stayWins++;
                } else {
                    this.results.stayLosses++;
                }
            }

            this.games.push(game);
        }

        // Calculate the percent
        this.results.switchWinPercent = Math.round(this.results.switchWins / this.results.switches * 100);
        this.results.stayWinPercent = Math.round(this.results.stayWins / this.results.stays * 100);
    }
}

module.exports = MontyHall;
