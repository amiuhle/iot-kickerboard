# Kickerboard

## Development

### Requirements

* [Node.js](https://nodejs.org/en/) `7.9.0`
* [yarn](https://yarnpkg.com/en/) `0.24.6`

### Install dependencies & initialize database

```bash
# Install Node.js dependencies
yarn

# Create database and tables
yarn run knex migrate:latest

# Fill with seed data
yarn run knex seed:run
```

### Development server

The development server runs on port `3000`

```bash
# start local development server
yarn start
```

### API Documentation

The API can be tested by using the supplied [Postman](https://www.getpostman.com/) collection (`Kickerboard.postman_collection.json`) or any other HTTP utility like `curl`.

#### Create Shot

Inserts a new shot, updating the last shot so that actualHit equals the curent shooter.

Returns the id of the created shot.

```http
POST /api/shots HTTP/1.1
Content-Type: application/json

{
  "shooter": 0,
  "target": 4
}

HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{"shot_id":102}

```

`curl -X POST http://localhost:3000/api/shots -H 'Content-Type: application/json' -d '{"shooter":0,"target":4}'`
