#!/bin/bash

cd ./back
docker-compose up -d postgres-database
npm install
npm run build
npm run start:prod