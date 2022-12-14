#!/bin/bash

cd ./back
enum="active"
DockerActive=$(systemctl is-active docker)

if [ "$enum" = "$DockerActive" ]; then
    docker-compose up -d postgres-database
    npm install
    npm run build
    npm run start:prod
else
    echo "Docker is not active, try running 'sudo systemctl start docker.service'"
    exit
fi