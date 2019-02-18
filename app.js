'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json()); // Use Node.js body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // Allow nested objects

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

const server = app.listen(port, (error) => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
    console.log(`App running on port ${port}`);
});