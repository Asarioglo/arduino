var POSITIVE_MESSAGE = 'positive_msg';
var NEGATIVE_MESSAGE = 'negative_msg';
var NEUTRAL_MESSAGE = 'neutral_msg';

function init() {
    setInterval(function() {
        $.ajax('/house/v1/garage/status', {
            success: function(data) {
                if(data == null) {
                    changeGarageStatus('errored')
                } else {
                    changeGarageStatus(data.status);
                }
            },
            error: function(e) {
                throw e;
            }
        })
    }, 1000);
}

function changeGarageStatus (status) {
    var h = $('.garage-door > .status-text');
    switch (status) {
        case 'open':
            h.text('Garage is Opened');
            setNegative(h);
            break;
        case 'closed':
            h.text('Garage is Closed');
            setPositive(h);
            break;
        default:
            h.text('Garage Sensor Error');
            setNegative(h);
            break;
    }
}

function setPositive ($el) {
    cleanMoodClasses($el);
    $el.addClass(POSITIVE_MESSAGE);
}

function setNegative ($el) {
    cleanMoodClasses($el);
    $el.addClass(NEGATIVE_MESSAGE);
}

function setNeutral ($el) {
    cleanMoodClasses($el);
    $el.addClass(NEUTRAL_MESSAGE);
}

function cleanMoodClasses ($el) {
    $el.removeClass(POSITIVE_MESSAGE);
    $el.removeClass(NEGATIVE_MESSAGE);
    $el.removeClass(NEUTRAL_MESSAGE);
}