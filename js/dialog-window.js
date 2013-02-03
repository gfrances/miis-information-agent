/**
 * Guillem Francès <guillem.frances@gmail.com>
 */

function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}


jQuery(function($){
    var dialogCanvas = $('#dialog-canvas');
    var canvasWrapper = $('#dialog-canvas-wrapper');
    var sayInput = $('#say');

    /* Scroll the canvas "down" to the most recent dialog line */
    var scrollCanvas = function() {
        var position = canvasWrapper.height() - dialogCanvas.height();
        dialogCanvas.animate({top:position + 'px'}, 200);
    };


//    var dialogHistory = [];
    var say = function(text, who) {
        who = who || '';
//        dialogHistory.push(text);
        dialogCanvas.append('<p class="dialog-line ' + who + '">' + htmlEscape(text) + '</p>');
        scrollCanvas();
    };


    sayInput.focus(); // Initial focus on the input


    var processInput = function() {
        var txt = sayInput.val().trim();
        if (txt == '') return;
        sayInput.val(''); // Clean the input
        eventManager.trigger('user-said', [txt]);
    };

    /* Detect click on the "Say" button */
    $('#say-button').click(function(e) {
        e.preventDefault();
        processInput();
    });

    /* Detect pressing enter on the text input */
    sayInput.keypress(function(e) {
        if(e.which == 13) {
            e.preventDefault();
            processInput();
        }
    });

    window.dialogWindow = {
        "say": say
    };
    window.eventManager = $('body');
});