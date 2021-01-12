# Log Rocket Tutorial - Node.js, Express.js, and PostgreSql: CRUD REST API Example
## Table of contents
* [General information](#general-information)
* [Technologies](#technologies)
* [Following along](#following-along)
* [Setup](#setup)
* [Endpoints](#endpoints)

## General Information
This code repository contains the completed [tutorial](https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/) from Log Rocket on building a CRUD REST API using Node.js, Express.js, and PostgreSQL.

## Technologies
* JavaScript
* Node.js
* Express.js
* PostgreSQL

## Following along
If you are interested in following along with the tutorial, there are a few additional information/ corrections that will make it easier for you.

### Installing PostgreSQL on Linux
The tutorial contains instructions on how to setup PostgreSQL on Windows and Mac but leaves out the [instructions for Linux](https://www.postgresql.org/download/linux/#generic). 

### Creating a role
In the section `Creatinga role`, when asked to run the command `psql -d postgres -U me` to connect to postgres using user `me`, the command will fail. 

This is because Linux tries to authenticate that user against an OS system user via peer authentication. The chances are that you do not have a system user of that name. The easiest way to solve this is to change the way that [PostgreSQL authenticates users](https://gist.github.com/AtulKsol/4470d377b448e56468baef85af7fd614).

In the linked article, you can see that the solution is to mofidy the `pg_hba.conf` file to change the `peer` authentication to `md5`. Once changed and the DBMS service restarted, you will be asked to enter the password for `me` when running `psql -d postgres -U me`.

> `pg_hba.conf` can be found at `/ect/postgresql/13/main`. 

### POST a new user
In this section, the tutorial contains a mistake. In the `const createUser` function, the query should read 

`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`.

Also, the parameter to the send method should instead be `result.rows[0].id`, i.e.

`response.status(201).send(User added with ID: ${result.rows[0].id})`

### Project structure
The project structure aims to follow the [guidelines from the node-postgres documentation](https://node-postgres.com/guides/async-express).

## Setup
In order to run the program, you need to install Node.js on your computer:
* [Download](https://nodejs.org/en/download/) the binaries
* If you use Linux, follow the [installation instructions](https://github.com/nodejs/help/wiki/Installation#how-to-install-nodejs-via-binary-archive-on-linux).

Once installed, install the program's dependencies with `npm install` in your terminal with the project's folder as working directory.

You can then start the Express server by typing `node index.js`.

## Endpoints
Once you have the server up and running, the following end points will be reachable on `http://localhost:4001/`:

GET
* `/users` - returns all users
* `/users/:id` - returns a user by id

POST
* `/users` - creates a new user

PUT
* `/users/:id` - updates a user

DELETE
* `/users/:id` - deletes a user
