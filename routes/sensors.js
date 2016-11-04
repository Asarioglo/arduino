// Read arduino ultrasonic sensor
var SerialPort = require("serialport").SerialPort;
var config = require('../config/sensors.json');
var serialportGarage = new SerialPort(config.garage.comport);
var serialportMulti = new SerialPort(config.multisensor.comport, {
    parser: SerialPort.parsers.readline('\n')
});// var Readline = SerialPort.parsers.Readline;
// var parser = new Readline();
// serialportMulti.pipe(parser);

garage_door_status = 'errored';
temperature_reading = 0;
humidity_reading = 0;
light_reaging = 0;
multi_sensor_status = 'offline';

serialportGarage.on('open', function(){
    console.log('Garage Port Opened');
    serialportGarage.on('data', function(data){
        processGarageData(data);
    });
});

serialportMulti.on('open', function() {
    console.log("Multisensor Port Opened");
    var line;
    serialportMulti.on('data', function(data){
        processMultiSensorData(data);
    });
});

function processGarageData (data) {
    if(!data || !data[0]) {
        setGarageStatus('errored');
    }
    if(data[0] <= 35 && data[0] > 0) {
        setGarageStatus('closed');
    } else if(data[0] > 35) {
        setGarageStatus('open');
    } else {
        setGarageStatus('errored');
    }
    console.log(data[0]);
}

function processMultiSensorData(data) {
    if(!data) {
        setGarageStatus('errored');
    }
    var keyVal = data.split(':');
    setSensorReading(keyVal[0], keyVal[1]);
    console.log(data);
}

function setSensorReading (letter, value) {
    value = parseFloat(value);
    if(isNaN(value)) return;
    switch(letter) {
        case 't':
            setTemperature(value);
            break;
        case 'h':
            setHumidity(value);
            break;
        case 'l':
            setLight(value);
            break;
        default:
            return;
    }
}

function setMultisensorStatus(status) {
    multi_sensor_status = status;
}

function setTemperature(val) {
    temperature_reading = val;
}

function setHumidity(val) {
    humidity_reading = val;
}

function setLight(val) {
    light_reading = val;
}

function setGarageStatus (status) {
    // TODO: find a way to get rid of global variable
    garage_door_status = status;
}
