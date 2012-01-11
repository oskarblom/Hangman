var gameEvents = (function() {
    var Game = function(eventHandler) {
        this.handler = eventHandler;
        this.jug = new Juggernaut;
    };
    Game.prototype.subscribe = function(channel) {
        window.hangman = new Hangman(document.getElementById("hangman-canvas"));
        this.jug.subscribe(channel, function(data) {
            console.log(data);
            game = JSON.parse(data);
            switch (game.state) {
                case "RUNNING":
                    break;
                case "CORRECT_GUESS":
                    break;
                case "INCORRECT_GUESS":
                    console.log("incorrect guess event");
                    window.hangman.drawNextPart();
                    break;
                case "OVER_SAVED":
                    break;
                case "OVER_HUNG":
                    break;
                default:
                    break;
            }
        });
    };
    return {
        "listen" : function(channel, eventHandler) {
            new Game(eventHandler).subscribe(channel);
        }
    }
}());

