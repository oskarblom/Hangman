(function($) {

    var currentChannel;
    var currentLetter;

    function getGameChannel() {
        var uri = document.baseURI.split("/");
        if(uri.length > 0 && uri.length === 5) {
            return uri[uri.length - 1];
        } 
    }

    var eventHandler = {
        onConnect: function() {
            $.post("/game/join/" + currentChannel);
        },
        onRunning : function (game) { 
            $("#letters").show();
            $(".letter a").click(function(event) {
                event.preventDefault();
                currentLetter = $(this).html();
                $(this).parent().html(currentLetter);
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
