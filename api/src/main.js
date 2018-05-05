import http from 'http'
import cors from 'cors'
import mysql from 'mysql'
import express from 'express'
import bodyParser from 'body-parser'

/*
|
| We boot up an express server instance.
|
*/

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.server = http.createServer(app)
app.server.listen(8080)

// DB

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Louis',
  password: 'louis9824',
  database: 'website'
})

connection.connect()

// Routes

app.get('/', (req, res) => {
  res.send('Hello')
})

// Login endpoint
app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  connection.query(`SELECT * FROM customers WHERE Email = '${email}' AND Password = '${password}'`, (err, result) => {
    if (err) { res.sendStatus(400) }

    if (result.length > 0) {
      res.send({ name: result[0].Username })
    } else {
      res.sendStatus(403)
    }
  })
})

// Register endpoint
app.post('/register', (req, res) => {
  const user = {
    Username: req.body.name,
    Email: req.body.email,
    Password: req.body.password
  }

  connection.query(`INSERT INTO customers SET ?`, user, (err) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.sendStatus(201)
    }
  })
})

app.post('/chat', (req, res) => {
  connection.query(`SELECT * FROM customers WHERE Username = '${req.body.name}'`, (err, result) => {
    if (err) {
      return res.sendStatus(400)
    }

    const message = {
      message: req.body.message,
      user_id: result[0].ID
    }

    connection.query(`INSERT INTO chatlog SET ?`, message, (err) => {
      if (err) {
        res.sendStatus(400)
      } else {
        res.sendStatus(201)
      }
    })
  })
})

app.get('/chat', (req, res) => {
  connection.query(`
    SELECT m.message as body, c.Username as sender FROM chatlog m
    JOIN customers c ON c.ID = m.user_id
  `, (err, result) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.send(result)
    }
  })
})
