var POSITIVE_MESSAGE = 'positive_msg';
var NEGATIVE_MESSAGE = 'negative_msg';
var NEUTRAL_MESSAGE = 'neutral_msg';
var multisensorStatus = 'offline';

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
        });
        $.ajax('/house/v1/bedroom/multisensor', {
            success: function(data) {
                processTempData(data);
            },
            error: function(e) {
                handleTempError(e);
            }
        })
    }, 3000);
    $('.major-section-header').click(function() {
        $(this).parent().toggleClass('collapsed', 'expanded');
    });
    $('#menu-icon').click(function() {
        $('.main-menu-container').show();
    });
}

function handleTempError (e) {
    throw e;
}

function processTempData(data) {
    if(data == null) {
        return;
    }
    if(data.humid) {
        setHumidity(data.humid);
    }
    if(data.temp) {
        setTemperature(data.temp);
    }
    if(data.light) {
        setLight(data.light);
    }
    if(data.status) {
        setMultisensorStatus(data.status);
    }
}

function setHumidity(val) {
    $('#bedroom-humidity').text(val);
}

function setTemperature(val) {
    $('#bedroom-temp').text(val);
}

function setLight(val) {
    $('#bedroom-light').text(val);
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

function setMultisensorStatus(val) {
    multisensorStatus = val;
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