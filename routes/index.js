var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/house/v1/garage/status', function(req, res, next) {
  if(garage_door_status != null) {
    res.json({
      'status': garage_door_status
    })
  } else {
    res.json({
      'status': 'errored'
    })
  }
});

/* GET home page. */
router.get('/house/v1/bedroom/multisensor', function(req, res, next) {
  res.json({
    'temp': temperature_reading,
    'humid': humidity_reading,
    'light': light_reading,
    'status': multi_sensor_status
  });
});

module.exports = router;
