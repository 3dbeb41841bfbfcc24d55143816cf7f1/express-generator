#!/bin/bash
PORT=3000

# http localhost:${PORT}

http localhost:${PORT}/cars
http localhost:${PORT}/cars/new
http localhost:${PORT}/cars/1
http localhost:${PORT}/cars/1/edit
http -f POST localhost:${PORT}/cars make=Tesla model=X color=red year=2016
http localhost:${PORT}/cars
http PUT localhost:${PORT}/cars/1 color=blue
http localhost:${PORT}/cars
http DELETE localhost:${PORT}/cars/1
http localhost:${PORT}/cars
