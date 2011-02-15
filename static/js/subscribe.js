function Subscription(eventHandlers) {
    var handlers = eventHandlers
    this.subscribe = function(url) {
        $.ajax(url, {
            dataType: 'json',
            cache: 'false',
            success: function(data) {
                alert(data);
                subscribe(url);
            }
        }); 
    };
}
