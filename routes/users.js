
//MUST be configuration file path OR create a conf file with name index.js and give only folder path
const models = require( '../database/configBasedDbSetup');
//OR const models = require( '../database');


var express = require('express');
var router  = express.Router();

const successMsg = { "status":"SUCCESS","statusCode":"302"}
const failureMsg = { "status":"FAILURE","statusCode":"500"}

router.get('/', function(req, res) {
    models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.json(users);
  });
});

router.post('/create', function(req, res) {
    models.User.create({
      name: req.body.username
    }).then(function() {
      //res.redirect('/');
      res.json(successMsg);
    });
  });
  
  router.get('/:user_id/destroy', function(req, res) {
    models.User.destroy({
      where: {
        id: req.params.user_id
      }
    }).then(function() {
      ///res.redirect('/');
      res.json(successMsg);
    });
  });
  
  router.post('/:user_id/tasks/create', function (req, res) {
    models.Task.create({
      title: req.body.title,
      UserId: req.params.user_id
    }).then(function() {
      //res.redirect('/');
      res.json(successMsg);
    });
  });
  
  router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
    models.Task.destroy({
      where: {
        id: req.params.task_id
      }
    }).then(function() {
      //res.redirect('/');
      res.json(successMsg);
    });
  });

module.exports = router;
