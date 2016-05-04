# Cars Express App

## Steps to reproduce

* [Step 1 - Creating the Project](#step-1---creating-the-project)
* [Step 2 - Take a Tour of the Project](#step-2---take-a-tour-of-the-project)
* [Step 3 - Install and configure Express-EJS-Layouts](#step-3---install-and-configure-express-ejs-layouts)
* [Step 4 - Install Method-Override](#step-4---install-method-override)
* [Step 5 - Create Routes for our Cars Views](#step-5---create-routes-for-our-cars-views)
* [Step 6 - Create Some Views For Our Cars Routes](#step-6---create-some-views-for-our-cars-routes)
* [Step 7 - Add Some Style](#step-7---add-some-style)

### Step 1 - Creating the Project

1a. First `cd` into a directory where you can create this project, such as:

```bash
cd ~/ga/wdi/projects/mean
```

1b. Use `express` to generate the project:

```bash
npm install -g express-generator
express -h
express --ejs cars
cd cars
npm install
subl .
```

1c. Now lets edit `package.json` to use `nodemon`:

Just replace:

    "start": "node ./bin/www"

with

    "start": "nodemon ./bin/www"

1d. Start up your new `express` app:

```bash
echo '#!/bin/bash' > run.bash
echo 'DEBUG=cars:* npm start' >> run.bash
chmod u+x run.bash
./run.bash
```

1e. Test it out:

Load `http://localhost:3000/` in your browser to access the app.

1f. Save your work:

```bash
git init
echo 'node_modules/' > .gitignore
git add -A
git commit -m "Initial commit."
```

### Step 2 - Take a Tour of the Project

To see a list of the files and directories that were generated:

```bash
brew install tree
tree -I node_modules

.
├── app.js               # our specific Express Web App with more configuration
├── bin
│   └── www              # our startup script that configures the app
├── package.json         # our familiar npm file
├── public               # static assets
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes               # our route definitions and controller logic
│   ├── index.js         # routes for our main page(s)
│   └── users.js         # routes for our user pages
└── views                # our HTML views / templates
    ├── error.ejs
    └── index.ejs
```

### Step 3 - Install and configure Express-EJS-Layouts

[express-ejs-layouts](https://github.com/Soarez/express-ejs-layouts) provides _layout_ support for ejs in express!

3a. Install express-ejs-layouts

```bash
npm install --save express-ejs-layouts
```

3b. Add the following lines to `app.js`:

```javascript
var expressLayouts = require('express-ejs-layouts');
...
app.set('layout', 'layout');   // defaults to 'layout'
...
app.use(expressLayouts);
...
```

3c. Create the layout file `views/layout.ejs`:

```bash
touch views/layout.ejs
```

and put the following inside of `views/layout.ejs`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <%- body %>
  </body>
</html>
```

and set the content of `views/index.ejs` to the following:

```html
<p>Welcome to <%= title %></p>
```

3d. Use your browser to test it out.


> NOTE: Here is how to use a custom layout for a particular view:

```javascript
app.get('/', function(req, res) {
  res.render('aView', { layout: 'someSpecificLayout' });
});
```

### Step 4 - Install Method-Override

[Method Override](https://github.com/expressjs/method-override) lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

4a. Install method-override and lodash

```bash
npm install --save method-override
npm install --save lodash
```

4b. Add the following lines to `app.js`:

```javascript
var methodOverride = require('method-override');
...
app.use(methodOverride('_method'));
```

### Step 5 - Create Routes for our Cars Views

5a. Rename `routes/users.js` to `routes/cars.js`

```bash
mv routes/users.js routes/cars.js
```

5b. Set the content of `routes/cars.js` to:

```javascript
var express = require('express');
var _ = require('lodash');
var router = express.Router();

router.get('/', function(request, response) {
  response.send('Cars index');
});

// order matters here, we need new before show
router.get('/new', function(request, response) {
  response.send('Cars new');
});

router.get('/:id', function(request, response) {
  response.send('Cars show with id = ' + request.params.id);
});

router.post('/', function(request, response) {
  response.send('Cars create');
});

router.get('/:id/edit', function(request, response) {
  response.send('Cars edit with id = ' + request.params.id);
});

router.put('/:id', function(request, response) {
  response.send('Cars update with id = ' + request.params.id);
});

router.delete('/:id', function(request, response) {
  response.send('Cars delete with id = ' + request.params.id);
});

module.exports = router;
```

5c. Edit `app.js` and change:

```javascript
var users = require('./routes/users');
...
app.use('/users', users);
```

to

```javascript
var carsRouter = require('./routes/cars');
...
app.use('/cars', carsRouter);
```

5d. Install `httpie` for manual testing of our routes:

```
brew install httpie
```

5e. Write a bash script for testing the routes:

This Bash script uses `httpie` to test out all of our routes:

```bash
touch testit.bash
chmod u+x testit.bash
```

contents of testit.bash:

```bash
#!/bin/bash

http localhost:3000

http localhost:3000/cars
http localhost:3000/cars/new
http localhost:3000/cars/1
http localhost:3000/cars/1/edit
http -f POST localhost:3000/cars make=tesla
http PUT localhost:3000/cars/1 color=blue
http DELETE localhost:3000/cars/1
```

When we run this script, we should see all success status codes (200) and some nicely formatted HTML code for the HTTP GET requests.


### Step 6 - Create Some Views For Our Cars Routes

6a. Create the view files:

```bash
mkdir views/cars
touch views/cars/index.ejs
touch views/cars/show.ejs
touch views/cars/new.ejs
touch views/cars/edit.ejs
```

Add the content to the views:

6b. `views/cars/index.ejs`:

```html
<ul>
  <% cars.forEach(function(car){ %>
    <li><a href="/cars/<%= car._id %>"><%= car.make + ' ' + car.model %></a></li>
  <% }) %>
</ul>

<a href="/cars/new"><button>New</button></a>
```

6c. `views/cars/show.ejs`:

```html
<dl>
  <dt>Make</dt><dd><%= car.make %></dd>
  <dt>Model</dt><dd><%= car.model %></dd>
  <dt>Color</dt><dd><%= car.color %></dd>
  <dt>Year</dt><dd><%= car.year %></dd>
</dl>

<a href="/cars/<%= car._id %>/edit"><button>Edit</button></a>

<form method="POST" action="/cars/<%= car._id %>?_method=DELETE">
  <button type="submit">Delete</button>
</form>

<a href="/cars"><button>Back</button></a>
```

6d. `views/cars/new.ejs`:

```html
<form action="/cars" method="post">
  Make:
  <br>
  <input type="text" name="make">
  <br>

  Model:
  <br>
  <input type="text" name="model">
  <br>

  Year:
  <br>
  <input type="number" name="year">
  <br>

  Color:
  <br>
  <input type="text" name="color">
  <br>
  <input type="submit" value="Submit">
</form>

<a href="/cars"><button>Back</button></a>
```

6e. `views/cars/edit.ejs`:

```html
<form action="/cars/<%= car._id %>/?_method=put" method="post">
  Make:
  <br>
  <input type="text" name="make" value="<%= car.make %>">
  <br>

  Model:
  <br>
  <input type="text" name="model" value="<%= car.model %>">
  <br>

  Year:
  <br>
  <input type="number" name="year" value="<%= car.year %>">
  <br>

  Color:
  <br>
  <input type="text" name="color" value="<%= car.color %>">
  <br>
  <input type="submit" value="Submit">
</form>

<a href="/cars"><button>Back</button></a>
```

6f. Change the contents of `routes/cars.js` to the following:

```javascript
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
```

### Step 7 - Add Some Style

Add the following to the bottom of `public/stylesheets/style.css`:

```css
button {
  color: white;
  background: #0080ff;
  margin: 2px;
  padding: 5px;
}

input[type="submit"] {
  color: black;
  background: #80ff00;
  margin: 2px;
  padding: 5px;
}

dl {
  border: 3px double #ccc;
  padding: 0.5em;
}

dt {
  float: left;
  clear: left;
  width: 100px;
  text-align: right;
  font-weight: bold;
  color: green;
}

dt:after {
  content: ":";
}

dd {
  margin: 0 0 0 110px;
  padding: 0 0 0.5em 0;
}
```
