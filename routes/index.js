var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'the Notion Server. Request to the Notion API are formatted and consumed here using the Notion JS SDK.' });
});

module.exports = router;
