# express-api

> Simple Express RESTful API with validation

## Install

```
# Dependencies
npm install

# MongoDB
docker-compose up -d

# Start server
npm start
```

## Server

Running on [http://localhost:8080](http://localhost:8080).

## API

| Route | HTTP Verb | Description |
|---|---|---|---|---|
| /api/cheetahs | GET | Get all the cheetahs |
| /api/cheetahs | POST | Create a cheetah |
| /api/cheetahs/:id | GET | Get a single cheetah |
| /api/cheetahs/:id | PUT | Update a cheetah with new info |
| /api/cheetahs/:id | DELETE | Delete a cheetah |
