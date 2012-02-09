(function($) {
    function getGameChannel() {
        var uri = document.baseURI.split("/");
        if(uri.length > 0 && uri.length === 5) {
            return uri[uri.length - 1];
        } else {
            throw "No game hash found";
        }
    }
    console.log(getGameChannel());
})(jQuery);
