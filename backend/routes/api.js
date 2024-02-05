var express = require('express');
var router = express.Router();

//GET all users

router.get('/users', function(req, res, next) {
  req.app.locals.db.collection("users").find().project({password: 0}).toArray()
  .then(results => {

    console.log(results);


  })
  res.send('get users');
});

//POST new user

router.post('/users/add', function(req, res){
  req.app.locals.db.collection("users").insertOne(req.body)
  .then(result => {
    res.send(result);
  })
})

module.exports = router;
