# Full Stack Notes App with Nest & React

This is a simple web application to take notes made with Nest as the main backend framework and React as the main frontend framework.

In order to correctly run the script that start the app the run machine must have __docker__ and __docker-compose__

## Runing the back

1. Create and start containers `docker-compose up -d postgres-database`
    - If container already exist `docker-compose start postgres-database`
2. Run the server, being on the back folder execute `npm run start:prod`