(function($) {

    function getGameChannel() {
        var uri = document.baseURI.split("/");
        if(uri.length > 0 && uri.length === 5) {
            return uri[uri.length - 1];
        } 
    }

    var eventHandler = {
        onConnect: function() {
            $.post("/game/join/" + channel);
        },
        onRunning : function (game) { },
        onCorrectGuess : function (game) { },
        onIncorrectGuess : function (game) { },
        onOverSaved : function (game) { },
        onOverHung : function (game) { }
    }

    $(document).ready(function() {
        var channel = getGameChannel();
        console.log("got game channel: " + channel);
        gameEvents.listen(channel, eventHandler);
        //TODO: expose connected event from the event dispatch instead
        //setTimeout(function() { $.post("/game/join/" + channel, function() {}); }, 1000);
    });

})(jQuery);
