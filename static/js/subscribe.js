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
    overSuccess: function(data) {
        alert("Success!");
    },
    overFailed: function(data) {
        alert("Failed!");
    },
    duplicate: function(data) {
       alert("You already used that letter!");
    },
    started: function(data) {
        console.log(data);
    },
    failed: function(data) {
        console.log(data);
    },
    correct: function(data) {
        console.log(data);
    }
};
