var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.app.locals.db.collection("test").find().toArray()
  .then(results => {console.log(results);})
  res.send('rederp with a herpsource');
});

router.post('/add', function(req, res){
  
})

module.exports = router;
