(function($) {

    var currentChannel;

    function getGameChannel() {
        var uri = document.baseURI.split("/");
        if(uri.length > 0 && uri.length === 5) {
            return uri[uri.length - 1];
        } 
    }

    var eventHandler = {
        onConnect: function() {
            console.log("guest connected");
            $.post("/game/join/" + currentChannel);
        },
        onRunning : function (game) { },
        onCorrectGuess : function (game) { },
        onIncorrectGuess : function (game) { },
        onOverSaved : function (game) { },
        onOverHung : function (game) { }
    }

    $(document).ready(function() {
        currentChannel = getGameChannel();
        gameEvents.listen(currentChannel, eventHandler);
    });

})(jQuery);
