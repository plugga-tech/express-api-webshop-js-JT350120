const express = require('express');
const router = express.Router();

const ObjectId = require('mongodb').ObjectId;

//Get all users
router.get('/users', function(req, res, next) {
  req.app.locals.db.collection("users").find().project({password: 0}).toArray()
  .then(results => {

    console.log(results);

  })
  res.send('get users');
});

//Get a specific user via id
router.post('/users', function(req, res, next) {
  req.app.locals.db.collection("users").find({_id: new ObjectId("65c0e96bc4957699d5ac238b")}).toArray()
  .then(results => {

    console.log(results);

  })
  res.send('get specific user');
});

//Create new user
router.post('/users/add', function(req, res){
  req.app.locals.db.collection("users").insertOne(req.body)
  .then(result => {
    res.send(result);
  })
})

module.exports = router;
