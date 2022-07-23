#!/bin/sh

./back-build.sh &

cd ./front
npm install
npm run start