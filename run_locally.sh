#!/bin/bash

docker build -t spaul5/property-app:v1 .

docker run -p 5000:5000 -d spaul5/property-app:v1
