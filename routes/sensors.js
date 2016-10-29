// Read arduino ultrasonic sensor
var SerialPort = require("serialport").SerialPort;
var config = require('../config/sensors.json');
var serialport = new SerialPort(config.garage.comport);

function setGarageStatus (status) {
    // TODO: find a way to get rid of global variable
    garage_door_status = status;
}

setGarageStatus('closed');
serialport.on('open', function(){
    console.log('Serial Port Opend');
    serialport.on('data', function(data){
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
    });
});
