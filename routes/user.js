const db = require('../db');
const express = require('express');
const usersRouter = new express.Router();

usersRouter.get('/', async (req, res) => {
  const {rows} = await db.query('SELECT * FROM users');
  if (rows) {
    res.status(200).send(rows);
  } else {
    res.status(404).send();
  }
});

usersRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (id) {
    const {rows} = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (rows[0]) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send();
    }
  } else {
    res.status(400).send();
  }
});

usersRouter.post('/', async (req, res) => {
  const {name, email} = req.body;
  const result = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email],
  );
  if (result.rows[0]) {
    res.status(200).send(result.rows[0]);
  } else {
    res.status(400).send();
  }
});

usersRouter.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const {name, email} = req.body;
  if (id) {
    const {rows} = await db.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id],
    );
    if (rows[0]) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send();
    }
  } else {
    res.status(400).send();
  }
});

module.exports = usersRouter;
