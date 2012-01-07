var gameEvents = (function() {
    var Game = function(eventHandler) {
        this.handler = eventHandler;
        this.jug = new Juggernaut;
    };
    Game.prototype.subscribe = function(channel) {
        this.jug.subscribe(channel, function(data) {
            console.log(data); 
        });
    };
    return {
        "listen" : function(channel, eventHandler) {
            console.log("yes");
            new Game(eventHandler).subscribe(channel);
        }
    }
}());

