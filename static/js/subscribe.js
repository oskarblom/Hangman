function Subscription(eventHandlers) {
    var handlers = eventHandlers;
    var self = this;
    this.subscribe = function(url) {
        $.ajax(url, {
            dataType: 'json',
            cache: 'false',
            success: function(data) {
                switch(data.status) {
                    case "over-success":
                        handlers.overSuccess(data);
                        break;
                    case "over-failed":
                        handlers.overFailed(data);
                        break;
                    case "duplicate":
                        handlers.duplicate(data);
                        break;
                    case "started":
                        handlers.started(data);
                        break;
                    case "failed":
                        handlers.failed(data);
                        break;
                    case "correct":
                        handlers.correct(data);
                        break;
                }
                self.subscribe(url);
            }
        }); 
    };
}

var evHandler = {
    started: function(data) {
        alert(data);
    }
};
