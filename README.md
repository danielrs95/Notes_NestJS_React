# Full Stack Notes App with Nest & React

This is a simple web application to take notes made with Nest as the main backend framework and React as the main frontend framework.

In order to correctly run the script that start the app the run machine must have __docker__, __docker-compose__ and __npm__

## Runing the project

1. Before run, be sure that all the script have the right permission to run `chmod +x script-name.sh` can help

2. While being on the root folder use the following script to start the project `./prod-build.sh`, this will

    - Create and start the container for the database
    - Install dependencies and run server
    - Install dependencies and run client

## Technologies

The app use __Postgres v13__, __NestJS v9.0__ and __React v18.2__