(function($) {

    var eventHandler = {
        onConnect : function() { },
        onRunning : function (game) { },
        onCorrectGuess : function (game) { },
        onIncorrectGuess : function (game) { },
        onOverSaved : function (game) { },
        onOverHung : function (game) { }
    }

    function getUrlByChannel(channel) {
        return window.location.protocol +  "//" + 
               window.location.host + "/join/" + channel;
    }

    $(document).ready(function() {

        $("#column-right").on("click", "#readonly-container div", function () {
            var linkField = $(this).prev("input");
            linkField.select();
        });

        $("#create").submit(function(event) {
            event.preventDefault();
            word = $("#create-textbox").val();

            if(!word.match(/^[A-Za-zÅÄÖåäö]+$/)) {
                var validationContainer = $("#validation-message");
                validationContainer.html("Ordet får bara bestå av bokstäver");
                validationContainer.show();
                return;
            } 
            
            $.post("/game/create/" + word, function(data) {
                $("#column-right").html(
                    "<div id='readonly-container'><input type='text' value='" +
                    getUrlByChannel(data.channel) + 
                    "' readonly='readonly'/><div></div></div>"
                );
                $("#column-right").prepend("<p>" + word.toUpperCase() + "</p>");
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
