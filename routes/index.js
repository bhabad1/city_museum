var express = require('express');
var router = express.Router();
var visitorsRouter = require('./visitors');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/visitors', visitorsRouter);


module.exports = router;
