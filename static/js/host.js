(function($) {

    var eventHandler = {
        onConnect : function() { },
        onRunning : function (game) { },
        onCorrectGuess : function (game) { },
        onIncorrectGuess : function (game) { },
        onOverSaved : function (game) { },
        onOverHung : function (game) { }
    }

    $(document).ready(function() {

        $("#create").submit(function() {
            event.preventDefault();
            word = $("#create-textbox").val();

            if(!word.match(/^[A-Za-zÅÄÖåäö]+$/)) {
                var validationContainer = $("#validation-message");
                validationContainer.html("Ordet får bara bestå av bokstäver");
                validationContainer.show();
                return;
            } 
            
            $.post("/game/create/" + word, function(data) {
                $("#column-right").html("http://localhost:5000/join/" + data.channel);
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
