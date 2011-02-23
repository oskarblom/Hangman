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
            }, complete: function(jqXHR, textStatus) {
            }
        }); 
    };
}


function EventHandler(hangman, statusContainer, wordStateContainer, observer) {
    
    var hMan = hangman;
    var statCont = statusContainer;
    var wordCont = wordStateContainer;
    var obs = observer;
    
    var.stringFromList = function(list) {
        var wd = "";
        $.each(list, function(i){
            wd = list[i];
        });
        return wd;
    };
    
    this.handlers = {
        overSuccess: function(data) {
            statCont.html("Correct! The man lives.");
            obs(data);
        },
        overFailed: function(data) {
            hMan.drawNextPart();
            statCont.html("Failed! The man hangs.");
            obs(data);
        },
        duplicate: function(data) {
            statCont.html("That letter has already been used. Try something else!");
            obs(data);
        },
        started: function(data) {
            statCont.html("Both players are now connected. Game on!");
            statCont.html(stringFromList(data.word_state));
            obs(data);
        },
        failed: function(data) {
            hMan.drawNextPart();
            obs(data);
        },
        correct: function(data) {
            wordCont.html(stringFromList(data.word_state));
            obs(data);
        }
        
        
    };
}

