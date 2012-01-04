(function($) {
    $(document).ready(function() {
        $("#create-button").click(function() {
            event.preventDefault();
            word = $("#create-textbox").val();
            if(!word.match(/^[A-Za-zÅÄÖåäö]+$/)){
                var validationMessage = $("#validation-message");
                validationMessage.html("Ordet får bara bestå av bokstäver");
                validationMessage.show();
            }
        });
    });
})(jQuery);
