#!/bin/bash

http localhost:3000

http localhost:3000/cars
http localhost:3000/cars/new
http localhost:3000/cars/1
http localhost:3000/cars/1/edit
http -f POST localhost:3000/cars make=tesla
http PUT localhost:3000/cars/1 color=blue
http DELETE localhost:3000/cars/1
