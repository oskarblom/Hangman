(function($) {

    function getGameChannel() {
        var uri = document.baseURI.split("/");
        if(uri.length > 0 && uri.length === 5) {
            return uri[uri.length - 1];
        } 
    }

    var eventHandler = {
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
        setTimeout(function() {
            $.post("/game/join/" + channel, function() {});
        }, 300);
    });

})(jQuery);
