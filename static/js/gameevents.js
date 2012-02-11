var gameEvents = (function($) {
    var jug = new Juggernaut();
    var subscribe = function(channel, handler) {
        var hangman = new Hangman(document.getElementById("hangman-canvas"));
        if(handler.onConnect !== undefined) {
            jug.on("connect", function() {
                handler.onConnect();
            });
        }
        jug.subscribe(channel, function(data) {
            console.log("got event");
            console.log(data);
            game = JSON.parse(data);
            switch (game.state) {
                case "RUNNING":
                    $("#info-box").html(
                        "<img src='/static/img/green.png' id='status-indicator'></img>" +
                        "<p>Motspelare ansluten</p>"
                    );
                    handler.onRunning(game);
                    break;
                case "CORRECT_GUESS":
                    break;
                case "INCORRECT_GUESS":
                    console.log("incorrect guess event");
                    hangman.drawNextPart();
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
    return { "listen" : subscribe }
})(jQuery);

