# Full Stack Notes App with Nest & React

![appImg](front/public/APP.png)

## [Live Preview](https://nest-note.herokuapp.com/)

Minimalist web notes app made with Nest as the main backend framework and React as the main frontend framework.

1. CRUD of notes
2. Tag application and filtering

The app was made with use __Postgres v13__, __NestJS v9.0__ and __React v18.2__

### Pending

1. Login

    - Ideally made a entity user with a relationship oneToMany to notes, and build from there the logic including authentication

2. [x] ~~Live deployed version~~

    - ~~The initial plan was made the app as easy as possible to run in a mac/linux machine, therefore docker was chosen to avoid any troubles with local configuring database on unknown environments~~

    - ~~Heroku comes to mind to live deployment, but I believe the logic of the connection to the app could change a bit mainly adding .env variables and using them were is needed~~
