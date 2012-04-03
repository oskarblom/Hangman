(function($) {

    var clearLetter = function(letter) {
        $(".letter:contains(" + letter + ")").css("visibility", "hidden");
    };

    var getUrlByChannel = function (channel) {
        return window.location.protocol +  "//" + 
               window.location.host + "/join/" + channel;
    };

    var eventHandler = {
        onConnect : function() {},
        onRunning : function (game) { $("#readonly-container").remove(); },
        onCorrectGuess : function (game) { clearLetter(game.last_guess); },
        onIncorrectGuess : function (game) { clearLetter(game.last_guess); },
        onOverSaved : function (game) { },
        onOverHung : function (game) { }
    }

    $(document).ready(function() {

        $("#column-right").on("click", "#readonly-container div", function () {
            var linkField = $(this).prev("input");
            linkField.select();
        });

        $("#create").submit(function(event) {
            event.preventDefault();

            var word = $("#create-textbox").val();

            var validationMessage = "";

            if (!word.match(/^[A-Za-zÅÄÖåäö]+$/)) {
                validationMessage = "Ordet får bara bestå av bokstäver";
            } else if (word.length > 12) {
                validationMessage = "Ordet får bestå av max 12 tecken";
            } 

            if (validationMessage !== "") {
                $("#validation-message").html(validationMessage).show();
                return;
            }
            
            $.post("/game/create/" + encodeURI(word.toUpperCase()), function(data) {
                $("#column-right").html(
                    "<div id='readonly-container'><p>Kopiera länken i rutan nedan och skicka den till din kompis.</p><input type='text' value='" +
                    getUrlByChannel(data.channel) + 
                    "' readonly='readonly'/><div></div></div>"
                );
                $("#column-right").prepend("<p>Ord: " + word.toUpperCase() + "</p>");
                gameEvents.listen(data.channel, eventHandler);
                $("#create").remove();
                $("#info-box").html(
                    "<img src='/static/img/waiting.gif' id='status-indicator'></img>" +
                    "<p>Väntar på att motspelare ska ansluta</p>"
                );
            }, "json");
        });

    });
})(jQuery);
