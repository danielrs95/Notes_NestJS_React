#!/bin/bash

./back-build.sh &

cd ./front
npm install
npm run start