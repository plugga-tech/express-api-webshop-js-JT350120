const express = require('express');
const router = express.Router();

const ObjectId = require('mongodb').ObjectId;

//Get all users
router.get('/users', function(req, res, next) {
  req.app.locals.db.collection("users").find().project({password: 0}).toArray()
  .then(results => {

    res.send(results);

  })
  //res.send('get users');
});

//Get a specific user via id
router.post('/users', function(req, res, next) {
  req.app.locals.db.collection("users").find({_id: new ObjectId(req.body)}).toArray()
  .then(result => {

    console.log(result);

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

//Login
router.post('/users/login', function(req, res, next) {
  req.app.locals.db.collection("users").find(req.body).toArray()
  .then(result => {

    if (result == "") {
      console.log("Fel uppgifter");
    } else {
      console.log("Inloggad som " + result[0].name);
    }

  })
  res.send('get specific user');
});


module.exports = router;
