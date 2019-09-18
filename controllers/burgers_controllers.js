var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");


//home URL rendering of burger data thru handlebars
router.get("/", function(req, res){
    burger.all(function(data){
        var hbsObject = {
            burgers: data
        };
        console.table(hbsObject);
        res.render("index", hbsObject);
    });


});

//posting new burgers to the api page
router.post("/api/burgers", function(req, res){
    burger.create(
        "burger_name", req.body.burger_name,
        function(result) {

            res.json({id: result.insertId});
        });
    
});


//router to put burgers into 'devoured' table

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  


//skip delete for now, not explicitly necessary

  module.exports = router;