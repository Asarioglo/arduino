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

module.exports = router;
