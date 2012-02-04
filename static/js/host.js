(function($) {

    eventHandler = {
        onRunning : function (game) {
            $("#info-box").html(
                "<img src='static/img/green.png' id='status-indicator'></img>"+
                "<p>Motspelare ansluten</p>"
            );
        },
        onCorrectGuess : function (game) { },
        onIncorrectGuess : function (game) { },
        onOverSaved : function (game) { },
        onOverHung : function (game) { }
    }

    $(document).ready(function() {
        $("#create-button").click(function() {
            event.preventDefault();
            word = $("#create-textbox").val();
            if(!word.match(/^[A-Za-zÅÄÖåäö]+$/)){
                var validationMessage = $("#validation-message");
                validationMessage.html("Ordet får bara bestå av bokstäver");
                validationMessage.show();
                return;
            } 
            $.post("/game/create/" + word, function(data) {
                console.log(data.channel);
                $("#column-center").prepend("<p>" + word.toUpperCase() + "</p>");
                gameEvents.listen(data.channel, eventHandler);
                $("#create").remove();
                $("#info-box").html(
                    "<img src='static/img/red.png' id='status-indicator'></img>" +
                    "<p>Motspelare ej ansluten</p>"
                );
            }, "json");
        });
    });
})(jQuery);
