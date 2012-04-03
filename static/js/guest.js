(function($) {

    var currentChannel;
    var currentLetter;

    var getGameChannel = function() {
        var url = document.URL.split("/");
        if(url.length > 0 && url.length === 5) {
            return url[url.length - 1];
        } 
    }

    var clearLinks = function() {
        $(".letter").each(function() {
            var letter = $(this).find("a").html();
            $(this).html(letter);
        });
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
                $.post("/game/guess/" + currentChannel + "/" + encodeURI(currentLetter));
            });
        },
        onCorrectGuess : function (game) { },
        onIncorrectGuess : function (game) { },
        onOverSaved : function (game) { 
           clearLinks(); 
        },
        onOverHung : function (game) {
           clearLinks(); 
        }
    }

    $(document).ready(function() {
        currentChannel = getGameChannel();
        gameEvents.listen(currentChannel, eventHandler);
    });

})(jQuery);
