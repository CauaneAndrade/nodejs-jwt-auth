
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

mongoose.connect('mongodb://user:user@localhost:27017/users?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

require('./controller/authController')(app)
app.use(cors())

app.listen(9000)
