const express = require("express");
const router = express.Router();

const ObjectId = require("mongodb").ObjectId;

//Get all users

router.get("/users", function (req, res, next) {
  req.app.locals.db
    .collection("users")
    .find()
    .project({ password: 0 }) //exclude passwords from results
    .toArray()
    .then((results) => {
      res.send(results);
    });
});

//Get a specific user via id

router.post("/users", function (req, res, next) {
  req.app.locals.db
    .collection("users")
    .find({ _id: new ObjectId(req.body) })
    .toArray()
    .then((result) => {
      console.log(result);
    });
  res.send("get specific user");
});

//Create a new user

router.post("/users/add", function (req, res) {
  req.app.locals.db
    .collection("users")
    .insertOne(req.body)
    .then((result) => {
      res.send(result);
    });
});

//Login

router.post("/users/login", function (req, res, next) {
  req.app.locals.db
    .collection("users")
    .find(req.body)
    .toArray()
    .then((result) => {
      if (result == "") {
        res.send("Fel uppgifter");
      } else {
        res.send("Inloggad som " + result[0].name);
      }
    });
});

//Create a new product

router.post("/products/add", function (req, res) {
  req.app.locals.db
    .collection("products")
    .insertOne(req.body)
    .then((result) => {
      res.send(result);
    });
});

//Get a specific product via ID in URL

router.get("/products/:id", function (req, res, next) {
  req.app.locals.db
    .collection("products")
    .find({ _id: new ObjectId(req.params.id) })
    .toArray()
    .then((result) => {
      if (result == "") {
        res.send("Produkten med ID " + req.params.id + " finns inte!");
      } else {
        res.send(result);
      }
    });

});

//Get all products

router.get("/products", function (req, res, next) {
  req.app.locals.db
    .collection("products")
    .find()
    .toArray()
    .then((results) => {
      res.send(results);
    });
});

//Place an order for a specific user

router.post("/orders/add", function (req, res, next) {
  req.app.locals.db
  .collection("users")
  .find({ _id: new ObjectId(req.body.user)})
  .toArray()
  .then((result) => {
    if (result == "") {

      res.send("Kunde inte lägga order. Användaren finns inte.");

    } else {

      let products = req.body.products;

      for (let i = 0; i < products.length; i++) {

        let amount = products[i].quantity;
        let amountLeft; 

        req.app.locals.db
        .collection("products")
        .find({ _id: new ObjectId(products[i].productId)})
        .toArray()
        .then((result) => {
          amountLeft = result[0].lager -= amount;
          req.app.locals.db
          .collection("products")
          .updateOne({ _id: new ObjectId(products[i].productId)}, {$set: {"lager": amountLeft}})
          .then((result) => {
            console.log(result);
          });
        });
      }
      
      res.send("Tack för din beställning " + result[0].name + "!")
      
    }
  });
});


module.exports = router;
