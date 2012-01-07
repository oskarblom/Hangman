(function($) {

    eventHandler = {
        onCreated : function () { },
        onRunning : function () { },
        onIncorrectGuess : function () { },
        onOverSaved : function () { },
        onOverHung : function () { }
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
            window.hm = new Hangman(document.getElementById("hangman-canvas"));
            $.post("/game/create/" + word, function(data) {
                console.log(data.channel);
                gameEvents.listen(data.channel, eventHandler);
            }, "json");
        });
    });
})(jQuery);
