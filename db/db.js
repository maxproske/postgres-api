'use strict';

// const Pool = require('pg').Pool;
const { Pool } = require('pg');

const config = {
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
};
const pool = new Pool(config);

// GET all users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    });
};

// GET a single user by id
const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    // $1 is a numbered placeholder
    pool.query('SELECT * from users WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).json(result.rows);
    });
};

// POST a new user
// $ curl -d "name=Max&email=mp@six12creative.com" http://localhost:3000/users
const createUser = (request, response) => {
    const { name, email } = request.body;
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email], (error, result) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`User created with id: ${result.rows[0].id}`);
    });
};

// PUT updated data in an existing user
// $ curl -X PUT -d "name=Max&email=max@mproske.com" http://localhost:3000/users/1
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Updated user with id: ${id}`);
    });
};

// DELETE a user
// $ curl -X DELETE http://localhost:3000/users/1
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Deleted user with id: ${id}`);
    });
};

// Destructure exports
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};