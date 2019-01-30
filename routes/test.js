var express = require('express');
var router = express.Router();

//-----------------------------------------------------------------------------------------------
// middleware that is specific to this router
//it must be before all routes.
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

//-----------------------------------------------------------------------------------------------
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//-----------------------------------------------------------------------------------------------
//More than one callback function can handle a route (make sure you specify the next object). For example:
router.get('/test-next', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

//-----------------------------------------------------------------------------------------------
//An array of callback functions can handle a route. For example:
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

router.get('/next-array', [cb0, cb1, cb2])

//-----------------------------------------------------------------------------------------------
//A combination of independent functions and arrays of functions can handle a route. For example
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

router.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})

//-----------------------------------------------------------------------------------------------
//You can create chainable route handlers for a route path by using app.route(). Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy and typos
router.route('/route-test')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })

//-----------------------------------------------------------------------------------------------
module.exports = router;
