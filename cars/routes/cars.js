var express = require('express');
var _ = require('lodash');
var router = express.Router();

var cars = [
  {
    _id:   0,
    make:  'Tesla',
    model: 'S',
    color: 'black',
    year:  2014
  },
  {
    _id:   1,
    make:  'Porsche',
    model: '911',
    color: 'silver',
    year:  2011
  }
];

router.get('/', function(request, response) {
  // TODO: get cars from DB
  response.render('cars/index', { title: 'Cars Index', cars: cars } );
});

// order matters here, we need new before show
router.get('/new', function(request, response) {
  response.render('cars/new', { title: 'Cars New' } );
});

router.get('/:id', function(request, response) {
  // TODO: get car from DB
  var car = cars[request.params.id];
  if (!car) {
    response.status(404).send({ error: "Car not found!" });
  }
  response.render('cars/show', { title: 'Cars Show', car: car } );
});

router.post('/', function(request, response) {
  // TODO: save new car in DB
  var newCar = {
    _id:   cars.length,
    make:  request.body["make"],
    model: request.body["model"],
    year:  request.body["year"],
    color: request.body["color"]
  }
  cars.push(newCar);
  response.redirect('/cars');
});

router.get('/:id/edit', function(request, response) {
  // TODO: get car from DB
  var car = cars[request.params.id];
  response.render('cars/edit', { title: 'Cars Edit', car: car } );
});

router.put('/:id', function(request, response) {
  // TODO: update car in DB
  console.log('Edit: request.body = ', request.body);
  var car = cars[request.params.id];
  _.merge(car, request.body);
  response.redirect('/cars/' + request.params.id);
});

router.delete('/:id', function(request, response) {
  // TODO: delete car from DB
  var car = cars[request.params.id];
  var index = cars.indexOf(car);
  if (index > -1) {
    cars.splice(index, 1);
  }
  response.redirect('/cars');
});

module.exports = router;
