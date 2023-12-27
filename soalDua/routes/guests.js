var express = require('express');
const db = require('../config/database');
var router = express.Router();

router.post('/guests', function (req, res, next) {
  let errors = [];

  if (!req.body.name) {
    errors.push("No name specified")
  }
  if (!req.body.address) {
    errors.push("No address specified")
  }
  if (!req.body.phone) {
    errors.push("No phone specified")
  }

  if (errors.length) {
    res.status(400).json({
      error: errors.join(", ")
    })
    return;
  }

  let data = {
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    notes: req.body.notes ?? null
  }

  let sql = 'INSERT INTO guests (name, address, phone, notes) VALUES (?,?,?,?)'
  let params = [
    data.name,
    data.address,
    data.phone,
    data.notes
  ];

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(500).json({
        error: err.message
      })
      return;
    }

    data.id = this.lastID;
    const { phone, address, ...newData } = data;
    res.json({
      message: 'success',
      data: newData,
    })
  })
});

router.get('/guests', function (req, res, next) {
  let sql = "SELECT * FROM guests"
  let params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        error: err.message
      })

      return;
    }

    // hide the phone and address
    const securedData = rows.map(row => ({
      ...row,
      phone: undefined,
      address: undefined,
    }));

    res.json({
      message: 'success',
      data: securedData,
    })
  });
});

module.exports = router;
