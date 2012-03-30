(function($) {

    var currentChannel;
    var currentLetter;

    function getGameChannel() {
        var url = document.URL.split("/");
        if(uri.length > 0 && uri.length === 5) {
            return uri[uri.length - 1];
        } 
    }

    var eventHandler = {
        onConnect: function() {
            $.post("/game/join/" + currentChannel);
        },
        onRunning : function (game) { 
            $(".letter a").click(function(event) {
                event.preventDefault();
                currentLetter = $(this).html();
                $(this).parent().css("visibility", "hidden");
                $.post("/game/guess/" + currentChannel + "/" + currentLetter);
            });
        },
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
