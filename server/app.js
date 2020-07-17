const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.APP_PORT || 2809
const app = express()
const path = require('path')
app.use(express.json())
app.use(cors())
// ROUTES
app.use('/trello/users', require('./routes/users'))
app.use('/trello/auth', require('./routes/auth'))
app.use('/trello/board', require('./routes/board'))
app.use('/trello/list', require('./routes/list'))
app.use('/trello/card', require('./routes/card'))
app.use(express.static(path.join(__dirname, '../build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', '../public/index.html'))
})

app.listen(port, () => {
  console.log('App running on ', port)
})
