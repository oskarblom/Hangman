var gameEvents = (function($) {


    var subscribe = function(channel, handler) {
        var hangman = new Hangman(document.getElementById("hangman-canvas"));
        var jug = new Juggernaut;

        if(handler.onConnect !== undefined) {
            jug.on("connect", function() {
                handler.onConnect();
            });
        }

        jug.subscribe(channel, function(data) {
            console.log("got event", data);
            var game = JSON.parse(data);
            var wordstateContainer = $("<div id='wordstate-container'></div>");
            switch (game.state) {
                case "RUNNING":
                    $("#info-box").remove();
                    $("#connection-status").show("slow");
                    $("#letters").show();
                    wordstateContainer.html(game.wordstate.join(" "))
                    $("#column-right").append(wordstateContainer);
                    handler.onRunning(game);
                    break;
                case "CORRECT_GUESS":
                    $("#wordstate-container").html(game.wordstate.join(" "));
                    handler.onCorrectGuess(game);
                    break;
                case "INCORRECT_GUESS":
                    $("#wordstate-container").html(game.wordstate.join(" "));
                    handler.onIncorrectGuess(game);
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
