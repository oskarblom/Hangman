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
                    $("#wordstate-container").html(game.wordstate.join(" "));
                    $("#column-right").append("<p>Gubben är räddad!</p>");
                    handler.onOverSaved(game);
                    break;
                case "OVER_HUNG":
                    hangman.drawNextPart();
                    $("#column-right").append("<p>Gubben dog! :( ordet var " + game.word + "</p>");
                    handler.onOverHung(game);
                    break;
                default:
                    break;
            }
        });
    };
    return { "listen" : subscribe }
})(jQuery);
