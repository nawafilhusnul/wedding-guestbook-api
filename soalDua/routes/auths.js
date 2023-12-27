const express = require('express');
const router = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

router.post('/login', function (req, res, next) {
  if (!req.body.username) {
    res.status(400).json({
      error: "Either password or username is wrong."
    })
    return;
  }

  if (!req.body.password) {
    res.status(400).json({
      error: "Either password or username is wrong."
    })
    return;
  }

  let sql = 'SELECT * FROM users WHERE username = ?'
  let params = [req.body.username]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(422).json({
        error: "Either password or username is wrong."
      })
      return;
    }

    const validPassword = bcryptjs.compareSync(req.body.password, row.password);
    if (!validPassword) {
      res.status(400).json({
        error: "Either password or username is wrong."
      })
      return;
    }

    const token = jwt.sign({ username: row.username, role: row.role }, "secret");

    res.status(200).json(
      {
        message: 'success',
        data: token,
      }
    )
  })

});

module.exports = router;
