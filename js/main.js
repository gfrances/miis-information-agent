/**
 * Guillem Francès <guillem.frances@gmail.com>
 */


jQuery(function($) {

    /* Returns how many occurrences of needle are there in haystack */
    var countOccurrences = function(needle, haystack) {
        var pattern = new RegExp(needle, "gi");
        return (haystack.match(pattern) || []).length;
    };

    var machine = {
        transitionMap: {},

        stateMessages: {},

        currentState: null,

        autoTransitions: {}, // List of auto-transitioned states, to prevent loops

        create: function(transitionMap, stateMessages) {
            this.stateMessages = stateMessages;
            this.transitionMap = transitionMap;
        },

        init: function(initialState) {
            this.checkStates();
            this.transitionTo(initialState);
        },

        checkStates: function() {
            _.each(_.keys(this.stateMessages), function(state) {
                this.checkStateIsValid(state);
            }, this);
        },

        checkStateIsValid: function(state) {
            if (!state || !this.transitionMap[state] || !this.stateMessages[state]) {
                throw new Error("Unknown state <" + state + ">");
            }
        },

        performAutoTransition: function() {
            var transitionList = this.transitionMap[this.currentState];
            if (transitionList.length == 1 && transitionList[0].auto && transitionList[0].to) {
                if (typeof this.autoTransitions[this.currentState] != "undefined") {
                    throw new Error("There is a cycle of auto transitions starting at " + this.currentState);
                }
                this.autoTransitions[this.currentState] = true;
                this.transitionTo(transitionList[0].to);
            } else {
                this.autoTransitions = {}; // Empty the auto-transitioned list
            }
        },

        feed: function(text) {
            if (this.checkFinished()) return;
            var nextState = this.getBestTransition(text);

            if (nextState) {
                this.transitionTo(nextState);
            } else {
                dialogWindow.say("Sorry I didn't understand, could you repeat?", "system");
            }


        },

        afterStateTransition: function() {
            // TODO: refactor somewhere else outside the class using events

            /* Utter the system message */
            this.sayCurrentMessage();

            this.checkFinished();
        },

        checkFinished: function() {
            if (this.isFinished()) {
                dialogWindow.say("<INTERACTION FINISHED>");
                return true;
            }
            return false;
        },

        /* Performs the FSM transition: */
        transitionTo: function(nextState) {
            this.checkStateIsValid(nextState);
            this.currentState = nextState;
            this.afterStateTransition(); // Trigger appropriate events
            this.performAutoTransition();
        },

        isFinished: function() {
            return this.transitionMap[this.currentState].length == 0;
        },

        getCurrentStateMessage: function() {
          return this.stateMessages[this.currentState] || "<NO SYSTEM MESSAGE>";
        },

        sayCurrentMessage: function() {
            dialogWindow.say(this.getCurrentStateMessage(), 'system');
        },

        getBestTransition: function(text) {
            var transitionList = this.getPossibleTransitions(this.currentState);
            var bestDestination = false;
            var bestScore = 0;
            var defaultDestination = false;

            _.each(transitionList, function(transition) {
                var kwList = transition.kw || [];
                var score = this.computeScore(kwList, text);
                if (transition.default) {
                    defaultDestination = transition.to;
                }
                if (score > bestScore) {
                    bestDestination = transition.to;
                    bestScore = score;
                }
            }, this);

            if (!bestDestination) { // If no destination is set, take the default (which might be unset as well).
                bestDestination = defaultDestination;
            }
            return bestDestination;
        },

        /**
         * Returns an array with all possible transitions from the given state.
         * @param origin
         */
        getPossibleTransitions: function(origin) {
            var extra = this.transitionMap['*']; // Add the extra transitions
            return _.union(this.transitionMap[origin], extra);
        },

        /*
        * Computes a score for the given "query" (in this case, an array of terms)
        * in the document 'text'.
        */
        computeScore: function(query, text) {
            /* Simply aggregate the total number of ocurrences of each query term in the text */
            return query.reduce(function(val, elem) { return val + countOccurrences(elem, text);}, 0);
        }



    };


    machine.create(fsm.transitions, fsm.stateMessages);
    machine.init(fsm.initialState);



    eventManager.bind('user-said', function(e, txt) {
        dialogWindow.say(txt, 'user');
        machine.feed(txt);
    });


});