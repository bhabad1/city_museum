var express = require('express');
var router = express.Router();
const visitorsCtrl = require('../controllers/visitor.controller');

/* GET home page. */
router.get('/', function(req, res, next) {

  visitorsCtrl.getVisitorStat(req,res,next);
});

module.exports = router;