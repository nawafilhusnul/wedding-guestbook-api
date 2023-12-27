const sqlite3 = require('sqlite3').verbose()
const bcryptjs = require('bcryptjs')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
    db.run(`CREATE TABLE guests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            address text, 
            phone text UNIQUE, 
            notes text,
            CONSTRAINT phone UNIQUE (phone)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          let insert = 'INSERT INTO guests (name, address, phone, notes) VALUES (?,?,?,?)'
          db.run(insert, ["Husnul", "Jl.Komando IV, No.21, Jakarta Selatan.", "+6282249907755", "Teman Dekat"])
          db.run(insert, ["Khansa", "Jl.Komando IV, No.22, Jakarta Selatan.", "+6282249907756", "Pacar Teman Dekat"])
        }
      });
    db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text UNIQUE,
            password text,
            role text,
            CONSTRAINT password UNIQUE(password)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          const admin1HashPassword = bcryptjs.hashSync('qwerty123', 10) // salt length assign to default which is 10
          const admin2HashPassword = bcryptjs.hashSync('qwerty', 10) // salt length assign to default which is 10
          // Table just created, creating some rows
          let insert = 'INSERT INTO users (username, password, role) VALUES (?,?,?)'
          db.run(insert, ["admin1", admin1HashPassword, "ADMIN"])
          db.run(insert, ["admin2", admin2HashPassword, "ADMIN"])
        }
      });
  }
});



module.exports = db